// ===========================================
// controllers/itemController.js - Task CRUD Controller
// ===========================================
// This file contains the logic for task management:
//   - getTasks: Get all tasks belonging to the logged-in user
//   - getTask: Get a single task by ID
//   - createTask: Create a new task
//   - updateTask: Update an existing task
//   - deleteTask: Delete a task
//
// IMPORTANT SECURITY CONCEPT:
// Every function checks that the task belongs to req.user (the logged-in user).
// This prevents users from accessing, modifying, or deleting other users' tasks.
// req.user is set by the auth middleware (protect) before these functions run.

import Task from '../models/Item.js';
import mongoose from 'mongoose';

// @desc    Get all tasks for the logged-in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    // Find ALL tasks where the 'user' field matches the logged-in user's ID
    // .sort({ createdAt: -1 }) sorts by newest first (-1 = descending)
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching tasks',
    });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    // Validate the ID format before querying the database
    // MongoDB ObjectIds have a specific format - invalid ones would cause a CastError
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
    }

    const task = await Task.findById(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // AUTHORIZATION CHECK: Ensure the task belongs to the logged-in user
    // We must use .toString() because MongoDB ObjectIds are objects, not strings
    // Without toString(): ObjectId("abc") !== ObjectId("abc") (different references)
    // With toString(): "abc" === "abc" (same string value)
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task',
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while fetching task',
    });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a task title',
      });
    }

    // Create the task and associate it with the logged-in user
    // req.user._id comes from the auth middleware
    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'pending',
      user: req.user._id, // Link this task to the authenticated user
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while creating task',
    });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
    }

    // First, find the task to check ownership
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // AUTHORIZATION CHECK: Only the owner can update their task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task',
      });
    }

    // Update the task with the new data
    // findByIdAndUpdate options:
    //   - new: true → returns the UPDATED document (not the old one)
    //   - runValidators: true → validates the update against schema rules
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while updating task',
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    // AUTHORIZATION CHECK: Only the owner can delete their task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task',
      });
    }

    // Remove the task from the database
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while deleting task',
    });
  }
};

export { getTasks, getTask, createTask, updateTask, deleteTask };
