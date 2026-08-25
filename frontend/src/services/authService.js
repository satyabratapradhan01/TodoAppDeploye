// ===========================================
// services/authService.js - Authentication API Calls
// ===========================================
// This file contains functions that make HTTP requests to the
// backend authentication endpoints.
//
// Each function:
// 1. Calls the backend API using the centralized Axios instance
// 2. Returns the response data (response.data contains the JSON body)
//
// These functions are used by AuthContext to manage authentication state.

import api from './api';

// Register a new user
// Sends: { name, email, password }
// Backend: POST /api/auth/register
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data; // { success: true, message: '...', data: { user } }
};

// Login a user
// Sends: { email, password }
// Backend: POST /api/auth/login
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data; // { success: true, message: '...', data: { user } }
};

// Logout the current user (clears the JWT cookie)
// Backend: POST /api/auth/logout
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data; // { success: true, message: 'Logged out successfully' }
};

// Get the currently logged-in user
// Backend: GET /api/auth/me (protected route)
// The JWT cookie is automatically sent with the request (thanks to withCredentials)
export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data; // { success: true, data: { user } }
};
