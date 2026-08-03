/**
 * Documents Service
 * Fetches indexed documents from the knowledge base.
 */

export async function getDocuments(filters = {}) {
  // TODO: Replace with: return fetch('/api/documents?' + new URLSearchParams(filters)).then(r => r.json())
  return Promise.resolve([])
}

export async function uploadDocument(file) {
  // TODO: Replace with multipart form upload to /api/documents/upload
  return Promise.resolve({ id: Date.now(), name: file.name, status: 'processing' })
}
