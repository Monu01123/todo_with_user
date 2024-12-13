import Task  from '../models/task.model.js';

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

const createTask = async (req, res) => {
  const { title } = req.body;
  const task = await Task.create({ user: req.user.id, title });
  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  const updatedTask = await task.save();
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

  await task.remove();
  res.json({ message: 'Task removed' });
};

export  { getTasks, createTask, updateTask, deleteTask };
