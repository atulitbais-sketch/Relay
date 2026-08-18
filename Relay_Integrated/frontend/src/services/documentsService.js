import { apiFetch } from './api'

export async function getDocuments(filters = {}) {
  const query = new URLSearchParams(filters).toString()
  return apiFetch(`/api/documents${query ? `?${query}` : ''}`)
}

export async function uploadDocument(file, projectId = 'nexora', category = 'General') {
  const form = new FormData()
  form.append('project_id', projectId)
  form.append('category', category)
  form.append('file', file)
  return apiFetch('/api/documents/upload', { method: 'POST', body: form })
}

export async function createDocument(data) {
  return apiFetch('/api/documents/new', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function deleteDocument(id, projectId = 'nexora') {
  return apiFetch(`/api/documents/${encodeURIComponent(id)}?project_id=${encodeURIComponent(projectId)}`, {
    method: 'DELETE',
  })
}
