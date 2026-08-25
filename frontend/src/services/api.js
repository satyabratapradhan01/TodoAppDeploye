// ===========================================
// services/api.js - Centralized Axios Configuration
// ===========================================
// This file creates a SINGLE, reusable Axios instance that all API calls use.
//
// WHY DO THIS?
// Instead of configuring the base URL, headers, and credentials in every file,
// we configure them ONCE here. Every API call in the app imports this instance.
//
// IMPORTANT: withCredentials: true
// This tells the browser to include cookies in cross-origin requests.
// Without this, the JWT cookie won't be sent to the backend,
// and all protected routes will return 401 Unauthorized.

import axios from 'axios';

// Create a pre-configured Axios instance
const api = axios.create({
  // Base URL for all API requests
  // import.meta.env.VITE_API_URL reads from the .env file
  // (Vite requires env variables to start with VITE_)
  baseURL: import.meta.env.VITE_API_URL,

  // CRITICAL: Include cookies in every request
  // The JWT is stored in an HTTP-only cookie
  // Without this, the cookie won't be sent to the backend
  withCredentials: true,

  // Default headers sent with every request
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
