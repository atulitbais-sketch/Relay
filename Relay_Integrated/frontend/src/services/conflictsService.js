import { apiFetch } from './api'

export async function getConflicts(filters = {}) {
  const query = new URLSearchParams(filters).toString()
  return apiFetch(`/api/conflicts${query ? `?${query}` : ''}`)
}
export async function resolveConflict(id, resolution='Resolved by user') {
  return apiFetch(`/api/conflicts/${id}/resolve`, { method:'POST', body:JSON.stringify({ resolution }) })
}
export async function dismissConflict(id) {
  return apiFetch(`/api/conflicts/${id}/dismiss`, { method:'POST' })
}
