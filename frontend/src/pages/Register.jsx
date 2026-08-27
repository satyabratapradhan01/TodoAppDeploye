// ===========================================
// pages/Register.jsx - Registration Page
// ===========================================
// This page allows new users to create an account.
//
// FLOW:
// 1. User fills in name, email, password, and confirm password
// 2. Client-side validation checks passwords match and length
// 3. We call AuthContext's register() function
// 4. register() calls the backend API (POST /api/auth/register)
// 5. On success: backend hashes password, creates user, sets JWT cookie
// 6. We redirect to the Dashboard

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // ---- CLIENT-SIDE VALIDATION ----
    // These checks happen before we even send a request to the server
    // This provides instant feedback to the user

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return; // Stop here - don't send the request
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      // Send registration data to the backend
      // Note: we DON'T send confirmPassword to the server
      // It's only used for client-side validation
      await register({ name, email, password });

      // On success, redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join TaskFlow to manage your tasks</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="form-group">
            <label htmlFor="register-name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="register-name"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email field */}
          <div className="form-group">
            <label htmlFor="register-email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="register-email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="register-password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="register-password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          {/* Confirm Password field */}
          <div className="form-group">
            <label htmlFor="register-confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="register-confirm-password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
