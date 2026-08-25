// ===========================================
// main.jsx - Application Entry Point
// ===========================================
// This is the FIRST file React loads (referenced in index.html).
// It sets up the app with three wrapper components:
//
// 1. React.StrictMode - Highlights potential problems during development
// 2. BrowserRouter - Enables client-side routing (URL-based navigation)
// 3. AuthProvider - Provides authentication state to the entire app
//
// Think of it like nesting boxes:
//   StrictMode → BrowserRouter → AuthProvider → App

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

// Find the 'root' div in index.html and render our React app inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
