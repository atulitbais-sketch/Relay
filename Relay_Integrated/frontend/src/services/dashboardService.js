import { apiFetch } from './api'
export async function getDashboardStats(filters={}) {
  const query=new URLSearchParams(filters).toString()
  return apiFetch(`/api/dashboard/stats${query ? `?${query}` : ''}`)
}
export async function getActivityGraph() {
  return apiFetch('/api/dashboard/activity')
}
