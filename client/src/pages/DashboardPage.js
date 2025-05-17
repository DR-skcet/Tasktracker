import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import {
  fetchTasks,
  createTask,
  toggleTaskCompletion,
  deleteTask
} from '../api/tasks';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // store full user object to get email
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  // Get Firebase user on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch tasks after user is set
  useEffect(() => {
    if (user) {
      setLoadingTasks(true);
      fetchTasks(user.uid)
        .then(setTasks)
        .catch(err => console.error("Error fetching tasks:", err))
        .finally(() => setLoadingTasks(false));
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const task = await createTask(newTaskTitle.trim(), user.uid);
      setTasks([...tasks, task]);
      setNewTaskTitle('');
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleToggle = async (taskId) => {
    try {
      const updatedTask = await toggleTaskCompletion(taskId);
      setTasks(tasks.map(t => t._id === taskId ? updatedTask : t));
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Styles
  const styles = {
    container: {
      maxWidth: '650px',
      margin: '40px auto',
      padding: '30px 24px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
    },
    greeting: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: '#334155', // slate-700
    },
    userEmail: {
      fontSize: '0.9rem',
      color: '#64748b', // slate-400
      marginTop: '4px',
    },
    logoutBtn: {
      backgroundColor: '#ef4444', // red-500
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '700',
      fontSize: '0.9rem',
      transition: 'background-color 0.3s ease, transform 0.15s ease',
      boxShadow: '0 4px 8px rgba(239, 68, 68, 0.3)',
    },
    logoutBtnHover: {
      backgroundColor: '#dc2626', // red-600
      transform: 'scale(1.05)',
    },
    inputContainer: {
      display: 'flex',
      marginBottom: '24px',
      gap: '12px',
    },
    input: {
      flexGrow: 1,
      padding: '12px 16px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1.8px solid #cbd5e1', // slate-300
      outline: 'none',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      boxShadow: inputFocused ? '0 0 8px rgba(59, 130, 246, 0.5)' : 'none',
    },
    addBtn: {
      backgroundColor: '#2563eb', // blue-600
      color: '#fff',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '700',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease, transform 0.15s ease',
      boxShadow: '0 5px 15px rgba(37, 99, 235, 0.4)',
    },
    addBtnHover: {
      backgroundColor: '#1d4ed8', // blue-700
      transform: 'scale(1.05)',
    },
    taskList: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      flexGrow: 1,
      overflowY: 'auto',
      maxHeight: 'calc(80vh - 200px)', // keeps the list scrollable with header & input
    },
    taskItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px 16px',
      borderRadius: '8px',
      marginBottom: '10px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      transition: 'box-shadow 0.3s ease, transform 0.2s ease',
      cursor: 'pointer',
    },
    taskItemHover: {
      boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
      transform: 'translateY(-2px)',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      marginRight: '14px',
      flexShrink: 0,
    },
    taskTitle: {
      flexGrow: 1,
      fontSize: '18px',
      color: '#1e293b', // slate-900
      userSelect: 'none',
    },
    completedTask: {
      textDecoration: 'line-through',
      color: '#94a3b8', // slate-400
      fontStyle: 'italic',
    },
    deleteBtn: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '22px',
      color: '#ef4444', // red-500
      transition: 'color 0.3s ease, transform 0.15s ease',
      flexShrink: 0,
    },
    deleteBtnHover: {
      color: '#dc2626', // red-600
      transform: 'scale(1.1)',
    },
    emptyState: {
      textAlign: 'center',
      color: '#64748b', // slate-400
      fontStyle: 'italic',
      marginTop: '80px',
      fontSize: '1.1rem',
    },
    loadingSpinner: {
      margin: 'auto',
      border: '6px solid #f3f4f6', // light gray
      borderTop: '6px solid #2563eb', // blue-600
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      animation: 'spin 1s linear infinite',
    },
    footer: {
      textAlign: 'center',
      marginTop: '32px',
      color: '#94a3b8',
      fontSize: '0.85rem',
      userSelect: 'none',
    },
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)'},
      '100%': { transform: 'rotate(360deg)'}
    }
  };

  // For task item hover effect, we’ll use React state to track hovered task
  const [hoveredTaskId, setHoveredTaskId] = useState(null);

return (
  <div style={styles.container}>
    <div style={styles.header}>
      <div>
        <div style={styles.greeting}>{getGreeting()}, {user?.displayName || 'User'} 👋</div>
        <div style={styles.userEmail}>{user?.email}</div>
      </div>
      <button
        style={{
          ...styles.logoutBtn,
        }}
        onClick={handleLogout}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = styles.logoutBtnHover.backgroundColor)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = styles.logoutBtn.backgroundColor)}
        aria-label="Logout"
      >
        Logout
      </button>
    </div>

    <div style={styles.inputContainer}>
      <input
        type="text"
        placeholder="Add new task..."
        style={styles.input}
        value={newTaskTitle}
        onChange={e => setNewTaskTitle(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        onKeyDown={e => { if (e.key === 'Enter') handleAddTask(); }}
        aria-label="New task input"
      />
      <button
        style={styles.addBtn}
        onClick={handleAddTask}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = styles.addBtnHover.backgroundColor)}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = styles.addBtn.backgroundColor)}
        aria-label="Add task button"
      >
        Add
      </button>
    </div>

    {loadingTasks ? (
      <div style={styles.loadingSpinner} aria-label="Loading tasks"></div>
    ) : tasks.length === 0 ? (
      <div style={styles.emptyState}>No tasks found. Add a task to get started!</div>
    ) : (
      <ul style={styles.taskList} aria-label="Task list">
        {tasks.map(task => (
          <li
            key={task._id}
            style={{
              ...styles.taskItem,
              ...(hoveredTaskId === task._id ? styles.taskItemHover : {}),
            }}
            onMouseEnter={() => setHoveredTaskId(task._id)}
            onMouseLeave={() => setHoveredTaskId(null)}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task._id)}
              style={styles.checkbox}
              aria-label={`Mark task "${task.title}" as completed`}
            />
            <span
              style={{
                ...styles.taskTitle,
                ...(task.completed ? styles.completedTask : {})
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleDelete(task._id)}
              style={styles.deleteBtn}
              aria-label={`Delete task "${task.title}"`}
              onMouseEnter={e => (e.currentTarget.style.color = styles.deleteBtnHover.color)}
              onMouseLeave={e => (e.currentTarget.style.color = styles.deleteBtn.color)}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    )}

    <footer style={styles.footer}>
      &copy; 2025 DRTracks. All rights reserved.
    </footer>

    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `}</style>
  </div>
    );
}