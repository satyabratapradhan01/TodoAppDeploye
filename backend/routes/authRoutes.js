// ===========================================
// routes/authRoutes.js - Authentication Routes
// ===========================================
// This file maps URL paths to their corresponding controller functions.
//
// HOW ROUTING WORKS:
// 1. A request comes in (e.g., POST /api/auth/login)
// 2. Express checks if the URL matches any defined route
// 3. If it matches, Express runs the associated controller function
// 4. If a middleware (like 'protect') is specified, it runs BEFORE the controller
//
// These routes are mounted at '/api/auth' in server.js
// So router.post('/login') becomes POST /api/auth/login

import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
} from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// ---- PUBLIC ROUTES ----
// These can be accessed by anyone (no authentication required)

router.post('/register', registerUser); // POST /api/auth/register
router.post('/login', loginUser);       // POST /api/auth/login
router.post('/logout', logoutUser);     // POST /api/auth/logout

// ---- PRIVATE ROUTES ----
// The 'protect' middleware runs BEFORE getMe
// It verifies the JWT and attaches req.user
// If verification fails, protect sends a 401 response and getMe never runs

router.get('/me', protect, getMe);      // GET /api/auth/me

export default router;
