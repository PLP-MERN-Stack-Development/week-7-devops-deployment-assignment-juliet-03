import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, addTask, updateTask, deleteTask } from '../services/TaskService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchTasks();
    }
    // eslint-disable-next-line
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title) return setError('Title is required');
    try {
      await addTask({ title, description });
      setTitle('');
      setDescription('');
      setError('');
      fetchTasks();
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const handleEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleUpdate = async (id) => {
    if (!editTitle) return setError('Title is required');
    try {
      await updateTask(id, { title: editTitle, description: editDescription });
      setEditId(null);
      setEditTitle('');
      setEditDescription('');
      setError('');
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard!</h2>
      <form className="task-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      {error && <div className="error-msg">{error}</div>}
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            {editId === task._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                />
                <button onClick={() => handleUpdate(task._id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className="task-title">{task.title}</span>
                {task.description && <span className="task-desc">{task.description}</span>}
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard; 