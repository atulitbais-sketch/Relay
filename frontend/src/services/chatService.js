/**
 * Chat Service
 */

export async function sendMessage(conversationId, message) {
  // TODO: Replace with streaming API call to /api/chat/message
  return Promise.resolve({ role: 'assistant', content: 'Mock response', sources: [] })
}

export async function getConversations() {
  // TODO: Replace with: return fetch('/api/chat/conversations').then(r => r.json())
  return Promise.resolve([])
}
