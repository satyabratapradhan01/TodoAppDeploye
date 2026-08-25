// ===========================================
// components/TaskForm.jsx - Reusable Task Form
// ===========================================
// This form is used by BOTH the CreateTask and EditTask pages.
// It avoids duplicating form code by accepting props that customize its behavior.
//
// PROPS:
//   - initialData: pre-filled values (used when editing an existing task)
//   - onSubmit: function called when the form is submitted
//   - isLoading: disables the submit button while saving
//   - buttonText: text to display on the submit button
//
// REUSABILITY:
//   CreateTask uses it like: <TaskForm onSubmit={handleCreate} buttonText="Create Task" />
//   EditTask uses it like: <TaskForm initialData={task} onSubmit={handleUpdate} buttonText="Update Task" />

import { useState, useEffect } from 'react';

function TaskForm({ initialData, onSubmit, isLoading, buttonText }) {
  // Form field state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  // When initialData changes (e.g., task data loads for editing),
  // populate the form fields with the existing values
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setStatus(initialData.status || 'pending');
    }
  }, [initialData]);

  // Handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form behavior (page reload)
    e.preventDefault();

    // Basic client-side validation
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    // Call the parent's onSubmit function with the form data
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      {/* Title field (required) */}
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Title <span style={{ color: 'var(--danger)' }}>*</span>
        </label>
        <input
          type="text"
          id="title"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      {/* Description field (optional) */}
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          className="form-input form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description (optional)"
          rows="4"
        />
      </div>

      {/* Status dropdown */}
      <div className="form-group">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          id="status"
          className="form-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="btn btn-primary btn-full"
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : buttonText || 'Save Task'}
      </button>
    </form>
  );
}

export default TaskForm;
