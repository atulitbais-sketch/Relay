/**
 * Conflicts Service
 */

export async function getConflicts(filters = {}) {
  // TODO: Replace with: return fetch('/api/conflicts?' + new URLSearchParams(filters)).then(r => r.json())
  return Promise.resolve([])
}

export async function resolveConflict(id, resolution) {
  // TODO: Replace with: return fetch(`/api/conflicts/${id}/resolve`, { method: 'POST', body: JSON.stringify(resolution) }).then(r => r.json())
  return Promise.resolve({ id, status: 'resolved' })
}

export async function dismissConflict(id) {
  // TODO: Replace with: return fetch(`/api/conflicts/${id}/dismiss`, { method: 'POST' }).then(r => r.json())
  return Promise.resolve({ id, status: 'dismissed' })
}
