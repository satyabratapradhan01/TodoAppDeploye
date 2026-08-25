// ===========================================
// components/Navbar.jsx - Navigation Bar
// ===========================================
// This component appears at the top of every page.
// It shows different content based on whether the user is logged in:
//   - Logged in: user name, dashboard link, logout button
//   - Not logged in: login link, register button

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  // Get the user and logout function from AuthContext
  const { user, logout } = useAuth();

  // useNavigate gives us a function to programmatically change the URL
  const navigate = useNavigate();

  // Handle logout button click
  const handleLogout = async () => {
    try {
      await logout(); // Calls the logout function from AuthContext
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        {/* Logo/Brand - always visible */}
        <Link to="/" className="navbar-brand">
          <span className="navbar-icon">✓</span>
          TaskFlow
        </Link>

        {/* Navigation links - change based on auth state */}
        <div className="navbar-links">
          {user ? (
            // ---- LOGGED IN: show user info and logout ----
            <>
              <span className="navbar-user">Hello, {user.name}</span>
              <Link to="/" className="nav-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </>
          ) : (
            // ---- NOT LOGGED IN: show login and register ----
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
