import React from 'react';

const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '0.5rem 0' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggle}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <button onClick={onDelete} style={{ marginLeft: 'auto' }}>Delete</button>
    </div>
  );
};

export default TaskItem;
