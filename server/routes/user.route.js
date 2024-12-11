import express from "express";
import user from "../models/user.models.js";

const router = express.Router();

router.post("/user", async (req, res) => {
  try {
    const newuser = new user({
      username: req.body.username,
      password: req.body.password,
    });
    const saveduser = await newuser.save();
    res.status(201).json(saveduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user", async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/user/:id", async (req, res) => {
  try {
    const updateduser = await user.findByIdAndUpdate(
      req.params.id,
      { username: req.body.username },
      { new: true }
    );

    if (!updateduser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updateduser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("user/:id", async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
