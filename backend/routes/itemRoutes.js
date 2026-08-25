// ===========================================
// routes/itemRoutes.js - Task CRUD Routes
// ===========================================
// This file maps URL paths to task controller functions.
// ALL routes here are PROTECTED - the user must be authenticated.
//
// HOW router.use(protect) WORKS:
// Instead of adding 'protect' to each individual route, we call
// router.use(protect) at the top. This applies the middleware to
// ALL routes defined in this router. It's a shortcut that saves repetition.
//
// HOW router.route() WORKS:
// router.route('/') groups multiple HTTP methods for the same path.
// It's equivalent to writing:
//   router.get('/', getTasks);
//   router.post('/', createTask);
//
// These routes are mounted at '/api/tasks' in server.js

import express from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/itemController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply authentication middleware to ALL routes in this router
// Every request must have a valid JWT cookie to proceed
router.use(protect);

// Routes for /api/tasks
router.route('/')
  .get(getTasks)      // GET /api/tasks       → Get all tasks for logged-in user
  .post(createTask);  // POST /api/tasks      → Create a new task

// Routes for /api/tasks/:id
// :id is a URL parameter - Express captures it as req.params.id
router.route('/:id')
  .get(getTask)       // GET /api/tasks/:id    → Get a single task by ID
  .put(updateTask)    // PUT /api/tasks/:id    → Update a task by ID
  .delete(deleteTask); // DELETE /api/tasks/:id → Delete a task by ID

export default router;
