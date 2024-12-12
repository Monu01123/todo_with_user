import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");
  const { userId } = useParams();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/todo/${userId}`);
      setTasks(response.data);
    } catch (err) {
      setError("Error fetching tasks: " + (err.response?.data?.message || err.message));
    }
  };

  const addTask = async () => {
    if (!newTask) {
      setError("Task cannot be empty");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/todo/${userId}`, {
        task: newTask,
        isComplete,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
      setIsComplete(false);
    } catch (err) {
      setError("Error adding task: " + (err.response?.data?.message || err.message));
    }
  };

  const updateTask = async (taskId, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:8080/todo/${userId}/${taskId}`, updatedTask);
      setTasks(tasks.map((task) => (task._id === taskId ? response.data : task)));
    } catch (err) {
      setError("Error updating task: " + (err.response?.data?.message || err.message));
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/todo/${userId}/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError("Error deleting task: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  return (
    <div>
      <h1>Task Manager</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={isComplete}
            onChange={(e) => setIsComplete(e.target.checked)}
          />
          Is Complete
        </label>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <input
              type="text"
              value={task.task}
              onChange={(e) =>
                updateTask(task._id, { task: e.target.value, isComplete: task.isComplete })
              }
            />
            <label>
              <input
                type="checkbox"
                checked={task.isComplete}
                onChange={(e) =>
                  updateTask(task._id, { task: task.task, isComplete: e.target.checked })
                }
              />
              Is Complete
            </label>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
