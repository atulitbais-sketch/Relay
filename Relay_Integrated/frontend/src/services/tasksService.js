import { apiFetch } from './api'

export async function getTasks(filters = {}) {
  const query = new URLSearchParams(filters).toString()
  return apiFetch(`/api/tasks${query ? `?${query}` : ''}`)
}
export async function createTask(data) {
  return apiFetch('/api/tasks', { method:'POST', body:JSON.stringify(data) })
}
export async function updateTask(id, data) {
  return apiFetch(`/api/tasks/${id}`, { method:'PATCH', body:JSON.stringify(data) })
}
