// ===========================================
// pages/EditTask.jsx - Edit Task Page
// ===========================================
// This page allows users to update an existing task.
//
// FLOW:
// 1. Component mounts → reads task ID from URL (useParams)
// 2. Fetches the task data from the backend (GET /api/tasks/:id)
// 3. Populates the form with the existing task data
// 4. User modifies fields and clicks "Update Task"
// 5. handleSubmit() calls taskService.updateTask() → PUT /api/tasks/:id
// 6. On success: redirect to Dashboard
//
// KEY CONCEPT: useParams()
// React Router's useParams() hook extracts URL parameters.
// For the route "/edit-task/:id", useParams() returns { id: "the-actual-id" }

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import * as taskService from '../services/taskService';

function EditTask() {
  // Extract the task ID from the URL
  // e.g., /edit-task/abc123 → id = "abc123"
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [task, setTask] = useState(null);     // The task being edited
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading the task data
  const [saving, setSaving] = useState(false);   // Saving updates

  // Fetch the task data when the component mounts
  useEffect(() => {
    fetchTask();
  }, [id]); // Re-fetch if the ID changes

  // Fetch the task from the backend
  const fetchTask = async () => {
    try {
      const response = await taskService.getTask(id);
      setTask(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load task');
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission (update the task)
  const handleSubmit = async (taskData) => {
    try {
      setError('');
      setSaving(true);

      // Send the updated data to the backend
      await taskService.updateTask(id, taskData);

      // On success, redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    } finally {
      setSaving(false);
    }
  };

  // Show loading spinner while fetching the task
  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading task...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="form-page">
        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>

        <h1 className="page-title">Edit Task</h1>

        {error && <div className="alert alert-error">{error}</div>}

        {task ? (
          // Show the form with the task's current data pre-filled
          <div className="form-card">
            <TaskForm
              initialData={task}
              onSubmit={handleSubmit}
              isLoading={saving}
              buttonText="Update Task"
            />
          </div>
        ) : (
          <div className="alert alert-error">
            Task not found. It may have been deleted.
          </div>
        )}
      </div>
    </div>
  );
}

export default EditTask;
