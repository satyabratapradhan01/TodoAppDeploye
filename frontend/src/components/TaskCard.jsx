// ===========================================
// components/TaskCard.jsx - Task Display Card
// ===========================================
// This component renders a single task as a card.
// It displays the task's title, description, status, date,
// and provides Edit and Delete action buttons.
//
// PROPS:
//   - task: the task object { _id, title, description, status, createdAt }
//   - onDelete: function called when the delete button is clicked

import { Link } from 'react-router-dom';

function TaskCard({ task, onDelete }) {
  // Configuration for each status type
  // Maps the status string to a display label and CSS class
  const statusConfig = {
    pending: { label: 'Pending', className: 'status-pending' },
    'in-progress': { label: 'In Progress', className: 'status-in-progress' },
    completed: { label: 'Completed', className: 'status-completed' },
  };

  // Get the config for the current task's status (fallback to 'pending')
  const status = statusConfig[task.status] || statusConfig['pending'];

  // Format a date string into a readable format
  // "2024-01-15T..." → "Jan 15, 2024"
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle the delete button click
  // Shows a confirmation dialog before actually deleting
  const handleDelete = () => {
    // window.confirm() shows a browser dialog with OK/Cancel buttons
    // Returns true if the user clicks OK, false if Cancel
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      onDelete(task._id); // Call the parent's delete function
    }
  };

  return (
    <div className="task-card">
      {/* Header: title and status badge */}
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`status-badge ${status.className}`}>
          {status.label}
        </span>
      </div>

      {/* Description (only shown if it exists) */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Footer: date and action buttons */}
      <div className="task-card-footer">
        <span className="task-date">
          Created: {formatDate(task.createdAt)}
        </span>
        <div className="task-actions">
          {/* Edit button - navigates to the edit page for this task */}
          <Link
            to={`/edit-task/${task._id}`}
            className="btn btn-sm btn-outline"
          >
            Edit
          </Link>
          {/* Delete button - shows confirmation then deletes */}
          <button onClick={handleDelete} className="btn btn-sm btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
