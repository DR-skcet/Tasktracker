const BASE_URL = 'http://localhost:5000/api/tasks';

// Get all tasks for a user
export async function fetchTasks(userId) {
  const response = await fetch(`${BASE_URL}/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

// Create a new task
export async function createTask(title, userId) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, userId }),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
}

// Toggle task completion
export async function toggleTaskCompletion(taskId) {
  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

// Delete a task
export async function deleteTask(taskId) {
  const response = await fetch(`${BASE_URL}/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete task');
  return response.json();
}
