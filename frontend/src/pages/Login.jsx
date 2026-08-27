// ===========================================
// pages/Login.jsx - Login Page
// ===========================================
// This page allows existing users to log in with their email and password.
//
// FLOW:
// 1. User fills in email and password
// 2. User clicks "Login"
// 3. We call AuthContext's login() function
// 4. login() calls the backend API (POST /api/auth/login)
// 5. On success: backend sets JWT cookie, we redirect to Dashboard
// 6. On failure: we display the error message from the API

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the login function from AuthContext
  const { login } = useAuth();

  // useNavigate allows programmatic navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');        // Clear any previous errors
    setLoading(true);    // Show loading state

    try {
      // Call the login function from AuthContext
      // This makes the API request and updates the user state
      await login({ email, password });

      // On success, redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // On failure, show the error message
      // err.response?.data?.message gets the error from the API response
      // The ?. (optional chaining) prevents crashes if the response format is unexpected
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      // Always turn off loading, whether success or failure
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {/* Error message - only shown when there's an error */}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="form-group">
            <label htmlFor="login-email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="login-email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="login-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="login-password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit button - disabled while loading */}
          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        {/* Link to register page */}
        <p className="auth-footer">
          Don&apos;t have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
