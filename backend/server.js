// ===========================================
// server.js - Entry Point for the Backend
// ===========================================
// This is the FIRST file that runs when you start the backend.
// It does the following:
// 1. Loads environment variables from .env
// 2. Connects to MongoDB
// 3. Sets up Express middleware (JSON parsing, cookies, CORS)
// 4. Registers API routes
// 5. Sets up error handling
// 6. Starts the server on a port

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables from .env file into process.env
dotenv.config();

// Connect to MongoDB (see config/db.js)
connectDB();

// Create the Express application
const app = express();

// ---- MIDDLEWARE ----
// Middleware runs BEFORE your route handlers on every request

// Parse incoming JSON data (allows reading req.body for JSON requests)
app.use(express.json());

// Parse URL-encoded form data (allows reading req.body for form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse cookies from the request headers (allows reading req.cookies)
// This is needed to read the JWT stored in an HTTP-only cookie
app.use(cookieParser());

// Configure CORS (Cross-Origin Resource Sharing)
// Parse allowed origins from env (supports single origin or comma-separated list)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

// ---- ROUTES ----

// Mount authentication routes at /api/auth
// e.g., POST /api/auth/register, POST /api/auth/login
app.use('/api/auth', authRoutes);

// Mount task routes at /api/tasks
// e.g., GET /api/tasks, POST /api/tasks, PUT /api/tasks/:id
app.use('/api/tasks', itemRoutes);

// Simple health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'MERN CRUD Auth API is running' });
});

// ---- ERROR HANDLING ----

// Handle requests to routes that don't exist (404)
app.use(notFound);

// Global error handler - catches all errors and sends a JSON response
app.use(errorHandler);

// ---- START SERVER ----

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});
