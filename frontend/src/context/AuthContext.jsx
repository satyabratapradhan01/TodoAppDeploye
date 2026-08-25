// ===========================================
// context/AuthContext.jsx - Authentication Context
// ===========================================
// This provides authentication state to the ENTIRE application
// using React's Context API.
//
// WHAT IS CONTEXT?
// Context is React's built-in way to share state across components
// without passing props through every level ("prop drilling").
//
// HOW THIS WORKS:
// 1. createContext() creates a "container" for shared data
// 2. AuthProvider wraps the app and manages the auth state
// 3. Any component can call useAuth() to access the state
// 4. When the state changes, all components using useAuth() re-render
//
// WHAT THIS PROVIDES:
// - user: the currently logged-in user (or null)
// - loading: true while checking if the user is authenticated
// - register(): create a new account
// - login(): sign in
// - logout(): sign out

import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

// Step 1: Create the context (the "container")
const AuthContext = createContext(null);

// Custom hook for easy access to the context
// Instead of writing useContext(AuthContext) everywhere,
// components just call useAuth()
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Step 2: Create the Provider component
// This wraps the entire app and manages authentication state
export const AuthProvider = ({ children }) => {
  // State: the current user (null = not logged in)
  const [user, setUser] = useState(null);

  // State: loading flag (true while checking auth on initial load)
  const [loading, setLoading] = useState(true);

  // On initial app load, check if the user is already logged in
  // This runs ONCE when the app starts
  // If the user has a valid JWT cookie, they'll be automatically logged in
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if the user has a valid session (JWT cookie)
  // This calls GET /api/auth/me - if the cookie is valid, we get the user data
  const checkAuth = async () => {
    try {
      const response = await authService.getMe();
      setUser(response.data); // User is logged in
    } catch {
      setUser(null); // No valid session - user is not logged in
    } finally {
      setLoading(false); // Done checking, regardless of result
    }
  };

  // Register a new user
  // After successful registration, the backend sets a JWT cookie
  // and returns the user data
  const register = async (userData) => {
    const response = await authService.register(userData);
    setUser(response.data); // Update state with the new user
    return response;
  };

  // Login an existing user
  // After successful login, the backend sets a JWT cookie
  // and returns the user data
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser(response.data); // Update state with the logged-in user
    return response;
  };

  // Logout the current user
  // The backend clears the JWT cookie
  const logout = async () => {
    await authService.logout();
    setUser(null); // Clear the user from state
  };

  // The value object is what components receive when they call useAuth()
  const value = {
    user,      // Current user object (or null)
    loading,   // Boolean: true during initial auth check
    register,  // Function to register
    login,     // Function to login
    logout,    // Function to logout
  };

  // Step 3: Provide the value to all child components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
