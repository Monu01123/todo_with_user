import todo from "../models/todo.model.js";

const checkTaskOwnership = async (req, res, next) => {
    try {
      const task = await todo.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      if (task.user.toString() !== req.params.userId) {
        return res.status(403).json({ message: "You are not authorized to modify this task" });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export default checkTaskOwnership;