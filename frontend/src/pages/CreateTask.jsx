// ===========================================
// pages/CreateTask.jsx - Create Task Page
// ===========================================
// This page provides a form to create a new task.
//
// FLOW:
// 1. User fills in the task form (title, description, status)
// 2. User clicks "Create Task"
// 3. handleSubmit() calls taskService.createTask() → POST /api/tasks
// 4. On success: redirect to Dashboard
// 5. On failure: display error message

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import * as taskService from '../services/taskService';

function CreateTask() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  // taskData comes from the TaskForm component: { title, description, status }
  const handleSubmit = async (taskData) => {
    try {
      setError('');
      setLoading(true);

      // Send the new task to the backend
      await taskService.createTask(taskData);

      // On success, redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-page">
        {/* Back link to dashboard */}
        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>

        <h1 className="page-title">Create New Task</h1>

        {error && <div className="alert alert-error">{error}</div>}

        {/* Task form - no initialData since this is a new task */}
        <div className="form-card">
          <TaskForm
            onSubmit={handleSubmit}
            isLoading={loading}
            buttonText="Create Task"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTask;
