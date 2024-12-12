import express from "express";
import todo from "../models/todo.model.js";
import user from "../models/user.models.js";
import checkTaskOwnership from "../middlware/user.middleware.js";

const router = express.Router();


router.post("/todo/:userId", async (req, res) => {
  try {
    const existingUser = await user.findById(req.params.userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTask = new todo({
      task: req.body.task,
      isComplete: req.body.isComplete,
      user: req.params.userId,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/todo/:userId", async (req, res) => {
  try {
    const tasks = await todo.find({ user: req.params.userId });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/todo/:userId/:id", checkTaskOwnership, async (req, res) => {
  try {
    console.log("Request Body: ", req.body);

    const updatedTask = await todo.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
        isComplete: req.body.isComplete,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/todo/:userId/:id", checkTaskOwnership, async (req, res) => {
  try {
    const deletedTask = await todo.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
