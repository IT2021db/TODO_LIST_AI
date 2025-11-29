import React from 'react';
import './TaskItem.css';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span className="task-text">{task.text}</span>
      <div className="task-actions">
        <button
          className="complete-btn"
          onClick={() => onToggle(task.id)}
          aria-label="Oznacz jako ukończone"
        >
          {task.completed ? 'Zadanie ukończone' : 'Zadanie ukończone'}
        </button>
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label="Usuń zadanie"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

