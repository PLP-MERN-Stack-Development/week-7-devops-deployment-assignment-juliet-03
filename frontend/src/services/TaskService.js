import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/api/tasks`;

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getTasks = () => axios.get(API, getAuthHeaders());
export const addTask = (task) => axios.post(API, task, getAuthHeaders());
export const updateTask = (id, updates) => axios.put(`${API}/${id}`, updates, getAuthHeaders());
export const deleteTask = (id) => axios.delete(`${API}/${id}`, getAuthHeaders()); 