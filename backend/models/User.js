// ===========================================
// models/User.js - User Model (Schema)
// ===========================================
// This file defines the structure of a User document in MongoDB.
//
// KEY CONCEPTS:
// - A Schema defines what fields a document can have and their types
// - A Model is a constructor compiled from a Schema, used to create/query documents
// - The pre('save') middleware automatically hashes passwords before saving
// - The comparePassword method is used during login to verify passwords
//
// SECURITY:
// - Passwords are NEVER stored as plain text
// - bcryptjs hashes the password with a salt (random string)
// - Even if the database is compromised, passwords remain protected

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema (blueprint) for User documents
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'], // Custom error message
    trim: true, // Removes whitespace from both ends
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,      // No two users can have the same email
    lowercase: true,   // Automatically converts to lowercase
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets to current date/time
  },
});

// ---- PRE-SAVE MIDDLEWARE ----
// This function runs automatically BEFORE a user document is saved to MongoDB.
// It hashes the password so we never store plain-text passwords.
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  // This prevents re-hashing when updating other fields like name or email
  if (!this.isModified('password')) {
    return next();
  }

  // Generate a "salt" - a random string added to the password before hashing
  // The number 10 is the "cost factor" (salt rounds)
  // Higher = more secure but slower (10 is a good balance)
  const salt = await bcrypt.genSalt(10);

  // Hash the password: combines the password + salt into a one-way hash
  // Example: "myPassword123" becomes "$2a$10$X7jH..."
  this.password = await bcrypt.hash(this.password, salt);

  next(); // Continue with saving
});

// ---- INSTANCE METHOD ----
// This method is available on every User document instance
// It compares a plain-text password with the hashed password stored in the database
// Used during login: user.comparePassword(enteredPassword)
userSchema.methods.comparePassword = async function (candidatePassword) {
  // bcrypt.compare() hashes the candidate password with the same salt
  // and compares it with the stored hash. Returns true if they match.
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model from the schema
// MongoDB will create a collection called "users" (lowercase + plural)
const User = mongoose.model('User', userSchema);

export default User;
