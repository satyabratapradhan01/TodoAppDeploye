// ===========================================
// pages/Dashboard.jsx - Main Dashboard Page
// ===========================================
// This is the main page users see after logging in.
// It displays:
//   - Welcome message with the user's name
//   - Task statistics (total, pending, in-progress, completed)
//   - Filter buttons to filter tasks by status
//   - A grid of task cards with edit/delete actions
//   - Empty state when there are no tasks
//
// DATA FLOW:
// 1. Component mounts → fetchTasks() → GET /api/tasks → setTasks()
// 2. Delete button → handleDelete() → DELETE /api/tasks/:id → remove from state
// 3. Filter buttons → setFilter() → filteredTasks computed from state

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import * as taskService from '../services/taskService';

function Dashboard() {
  const { user } = useAuth();

  // State for tasks data
  const [tasks, setTasks] = useState([]);

  // State for UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'in-progress', 'completed'

  // Fetch tasks when the component first renders
  useEffect(() => {
    fetchTasks();
  }, []);

  // Auto-hide success messages after 3 seconds
  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      // Cleanup: clear the timeout if the component unmounts or successMsg changes
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  // Fetch all tasks from the backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      setTasks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Delete a task by ID
  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);

      // Remove the deleted task from state
      // This updates the UI instantly without re-fetching from the server
      setTasks(tasks.filter((task) => task._id !== taskId));
      setSuccessMsg('Task deleted successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  // Filter tasks based on the selected filter
  // This is computed on every render (not stored in state)
  const filteredTasks =
    filter === 'all'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  // Count tasks by status (used for stats and filter labels)
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  // Helper to format filter label text
  const formatFilterLabel = (status) => {
    if (status === 'all') return 'All';
    if (status === 'in-progress') return 'In Progress';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="container">
      {/* ---- HEADER ---- */}
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back, {user?.name}!</p>
        </div>
        <Link to="/create-task" className="btn btn-primary">
          + New Task
        </Link>
      </div>

      {/* ---- MESSAGES ---- */}
      {error && <div className="alert alert-error">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      {/* ---- STATS GRID ---- */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-number">{taskCounts.all}</span>
          <span className="stat-label">Total Tasks</span>
        </div>
        <div className="stat-card stat-pending">
          <span className="stat-number">{taskCounts.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card stat-in-progress">
          <span className="stat-number">{taskCounts['in-progress']}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card stat-completed">
          <span className="stat-number">{taskCounts.completed}</span>
          <span className="stat-label">Completed</span>
        </div>
      </div>

      {/* ---- FILTER BAR ---- */}
      <div className="filter-bar">
        {['all', 'pending', 'in-progress', 'completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`filter-btn ${filter === status ? 'filter-active' : ''}`}
          >
            {formatFilterLabel(status)} ({taskCounts[status]})
          </button>
        ))}
      </div>

      {/* ---- TASK LIST ---- */}
      {loading ? (
        // Loading state
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        // Empty state
        <div className="empty-state">
          <p className="empty-icon">📋</p>
          <h3>No tasks found</h3>
          <p>
            {filter === 'all'
              ? "You haven't created any tasks yet. Let's get started!"
              : `No ${formatFilterLabel(filter).toLowerCase()} tasks.`}
          </p>
          {filter === 'all' && (
            <Link to="/create-task" className="btn btn-primary">
              Create Your First Task
            </Link>
          )}
        </div>
      ) : (
        // Task grid
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
