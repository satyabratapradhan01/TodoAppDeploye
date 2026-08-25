// vite.config.js - Vite Configuration
// Vite is the build tool and dev server for the frontend
// This file configures Vite to work with React

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Enable React support (JSX transformation, Fast Refresh)
});
