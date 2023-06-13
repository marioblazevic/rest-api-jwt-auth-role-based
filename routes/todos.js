const express = require("express");
const router = express.Router();
const verifyToken = require("../heplers/verifyToken");
const ToDo = require("../models/ToDo");

router.get("/", verifyToken, async (req, res) => {
  try {
    const todos = await ToDo.find();
    res.json(todos);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const todo = new ToDo({
    todo: req.body.todo,
    completed: req.body.completed,
    userId: req.user._id,
  });
  try {
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/:todoId", verifyToken, async (req, res) => {
  try {
    const removedToDo = await ToDo.deleteOne({ _id: req.params.todoId });
    res.json(removedToDo);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
