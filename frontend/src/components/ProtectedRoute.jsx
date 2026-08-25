// ===========================================
// components/ProtectedRoute.jsx - Route Guard
// ===========================================
// This component wraps protected pages to prevent unauthorized access.
//
// HOW IT WORKS:
// 1. Checks if the auth state is still loading (initial auth check)
//    → If loading, shows a spinner
// 2. Checks if the user is logged in
//    → If not logged in, redirects to /login
// 3. If logged in, renders the protected page (children)
//
// USAGE IN App.jsx:
//   <Route path="/" element={
//     <ProtectedRoute>
//       <Dashboard />    ← This only renders if user is authenticated
//     </ProtectedRoute>
//   } />

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // While checking authentication (initial page load), show a loading spinner
  // This prevents a flash of the login page before the auth check completes
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    );
  }

  // If the user is NOT authenticated, redirect to the login page
  // 'replace' replaces the current history entry instead of pushing a new one
  // This prevents the user from pressing "back" to reach the protected page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated - render the protected content
  return children;
}

export default ProtectedRoute;
