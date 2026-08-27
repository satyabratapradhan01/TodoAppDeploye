// ===========================================
// App.jsx - Main Application Component
// ===========================================
// This component defines ALL the routes (pages) in the application.
//
// ROUTING CONCEPTS:
// - <Routes> is a container for all route definitions
// - <Route path="/login" element={<Login />} /> means:
//   "When the URL is /login, render the Login component"
// - <Route path="*"> is a catch-all that matches any unmatched URL (404)
//
// PROTECTED ROUTES:
// Some routes are wrapped in <ProtectedRoute> which checks if the user
// is logged in before rendering the page. If not logged in, it redirects
// to the login page.

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      {/* Navbar is rendered on EVERY page (outside of Routes) */}
      <Navbar />

      {/* Main content area - changes based on the current URL */}
      <main className="main-content">
        <Routes>
          {/* ---- PUBLIC ROUTES ---- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ---- PROTECTED ROUTES ---- */}
          {/* Only authenticated users can access these pages */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-task/:id"
            element={
              <ProtectedRoute>
                <EditTask />
              </ProtectedRoute>
            }
          />

          {/* ---- CATCH-ALL ROUTE ---- */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
