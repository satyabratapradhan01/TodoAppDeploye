// ===========================================
// models/Item.js - Task Model (Schema)
// ===========================================
// This file defines the structure of a Task document in MongoDB.
//
// KEY CONCEPTS:
// - Each task has a title, description, status, and a reference to the user who created it
// - The 'user' field creates a relationship between Tasks and Users collections
// - The 'timestamps: true' option automatically adds createdAt and updatedAt fields
// - The 'enum' validator restricts status to only allowed values

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '', // Description is optional, defaults to empty string
    },
    status: {
      type: String,
      // enum restricts the value to one of these three options
      // Any other value will cause a validation error
      enum: {
        values: ['pending', 'in-progress', 'completed'],
        message: 'Status must be pending, in-progress, or completed',
      },
      default: 'pending', // New tasks start as "pending"
    },
    // This field creates a REFERENCE to a User document
    // It stores the User's _id (ObjectId) - this is how we link tasks to users
    // Think of it like a foreign key in SQL databases
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // References the 'User' model
      required: true,
    },
  },
  {
    // timestamps: true automatically adds:
    // - createdAt: date when the document was first created
    // - updatedAt: date when the document was last modified
    timestamps: true,
  }
);

// Create the Task model from the schema
// MongoDB will create a collection called "tasks" (lowercase + plural)
const Task = mongoose.model('Task', taskSchema);

export default Task;
