// ===========================================
// controllers/authController.js - Authentication Controller
// ===========================================
// This file contains the logic for user authentication:
//   - registerUser: Create a new user account
//   - loginUser: Log in and get a JWT token
//   - logoutUser: Clear the JWT cookie
//   - getMe: Get the currently logged-in user's data
//
// Each function is an Express route handler that receives (req, res).
// The req (request) contains the client's data.
// The res (response) is used to send data back to the client.

import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (anyone can access)
const registerUser = async (req, res) => {
  try {
    // Extract data from the request body
    // The client sends this data as JSON in the POST request
    const { name, email, password } = req.body;

    // ---- Validation ----
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    // Check if a user with this email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists',
      });
    }

    // Create the new user in MongoDB
    // The password will be AUTOMATICALLY HASHED by the pre-save middleware
    // defined in models/User.js (we never store plain-text passwords)
    const user = await User.create({ name, email, password });

    // Generate a JWT and set it as an HTTP-only cookie
    // After this, the client is "logged in" because they have the cookie
    generateToken(res, user._id);

    // Send success response
    // IMPORTANT: We never include the password in API responses
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

// @desc    Login user and get JWT token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ---- Validation ----
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists AND if the password is correct
    // user.comparePassword() is defined in models/User.js
    // It uses bcrypt to compare the plain-text password with the hash
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate a JWT and set it as an HTTP-only cookie
    generateToken(res, user._id);

    // Send success response
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

// @desc    Logout user (clear the JWT cookie)
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
  // Clear the JWT cookie by:
  // 1. Setting its value to an empty string
  // 2. Setting its expiration to a date in the past (Date(0) = Jan 1, 1970)
  // The browser will remove the cookie when it sees it's expired
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

// @desc    Get current logged-in user's profile
// @route   GET /api/auth/me
// @access  Private (requires authentication)
const getMe = async (req, res) => {
  // req.user was set by the protect middleware (authMiddleware.js)
  // The password is already excluded (because of .select('-password'))
  // So it's safe to send directly
  res.json({
    success: true,
    data: req.user,
  });
};

export { registerUser, loginUser, logoutUser, getMe };
