import express from 'express';
import {getTasks, createTask, updateTask, deleteTask} from '../controllers/task.js';
import { protect } from '../middlware/user.middleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
