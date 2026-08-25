// ===========================================
// services/taskService.js - Task API Calls
// ===========================================
// This file contains functions that make HTTP requests to the
// backend task CRUD endpoints.
//
// All these endpoints are PROTECTED - the JWT cookie must be present.
// The Axios instance (api) automatically sends the cookie because
// we configured withCredentials: true in services/api.js.

import api from './api';

// Get ALL tasks for the logged-in user
// Backend: GET /api/tasks
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data; // { success: true, count: N, data: [tasks] }
};

// Get a SINGLE task by its ID
// Backend: GET /api/tasks/:id
export const getTask = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data; // { success: true, data: { task } }
};

// Create a NEW task
// Sends: { title, description, status }
// Backend: POST /api/tasks
export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data; // { success: true, message: '...', data: { task } }
};

// Update an EXISTING task
// Sends: { title, description, status } (partial updates allowed)
// Backend: PUT /api/tasks/:id
export const updateTask = async (id, taskData) => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data; // { success: true, message: '...', data: { task } }
};

// Delete a task
// Backend: DELETE /api/tasks/:id
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data; // { success: true, message: 'Task deleted successfully' }
};
