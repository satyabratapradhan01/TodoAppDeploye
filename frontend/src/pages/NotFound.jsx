// ===========================================
// pages/NotFound.jsx - 404 Page
// ===========================================
// This page is shown when users navigate to a URL that doesn't exist.
// It's the catch-all route defined as <Route path="*"> in App.jsx.

import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-page">
      <h1 className="not-found-code">404</h1>
      <h2>Page Not Found</h2>
      <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
