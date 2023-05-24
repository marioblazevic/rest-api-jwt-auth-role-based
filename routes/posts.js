const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");
const verifyToken = require("../heplers/verifyToken");
const permit = require("../heplers/authorization");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post(
  "/",
  verifyToken,
  permit(["manager", "developer"]),
  async (req, res) => {
    const post = new Post({
      title: req.body.title,
      description: req.body.description,
      userId: req.user._id,
    });

    try {
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ messsage: err });
  }
});

router.delete("/:postId", verifyToken, async (req, res) => {
  try {
    const selectedPost = await Post.findById(req.params.postId);
    if (selectedPost.userId !== req.user._id) {
      return res.status(403).send("Not authorized!");
    }
  } catch (error) {
    return res.json({ message: error });
  }
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
