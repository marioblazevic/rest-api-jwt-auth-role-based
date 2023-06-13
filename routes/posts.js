const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../heplers/verifyToken");
const permit = require("../heplers/authorization");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", verifyToken, permit(["admin"]), async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    userId: req.user._id,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    res.json(error);
  }
});

router.delete(
  "/:postId",
  verifyToken,
  permit(["admin", "tester"]),
  async (req, res) => {
    try {
      const removedPost = await Post.deleteOne({ _id: req.params.postId });
      res.json(removedPost);
    } catch (error) {
      res.json(error);
    }
  }
);

router.patch(
  "/:postId",
  verifyToken,
  permit(["admin", "tester"]),
  async (req, res) => {
    try {
      const updatedPost = await Post.updateOne(
        { _id: req.params.postId },
        { $set: { title: req.body.title, description: req.body.description } }
      );
      res.json(updatedPost);
    } catch (error) {
      res.json(error);
    }
  }
);

module.exports = router;
