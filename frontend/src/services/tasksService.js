/**
 * Tasks Service
 */

export async function getTasks(filters = {}) {
  // TODO: Replace with: return fetch('/api/tasks?' + new URLSearchParams(filters)).then(r => r.json())
  return Promise.resolve([])
}

export async function createTask(data) {
  // TODO: Replace with: return fetch('/api/tasks', { method: 'POST', body: JSON.stringify(data) }).then(r => r.json())
  return Promise.resolve({ id: Date.now(), ...data })
}

export async function updateTask(id, data) {
  // TODO: Replace with: return fetch(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }).then(r => r.json())
  return Promise.resolve({ id, ...data })
}
