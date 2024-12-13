import React, { useEffect, useState } from 'react';
import API from './api.js';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await API.get('/tasks');
        setTasks(data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    try {
      const { data } = await API.post('/tasks', { title: newTask });
      setTasks([...tasks, data]);
      setNewTask('');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Task Dashboard</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
