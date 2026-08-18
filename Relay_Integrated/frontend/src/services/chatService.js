import { apiFetch } from './api'

export async function sendMessage(conversationId, message, projectId='nexora') {
  const data = await apiFetch('/api/chat/message', {
    method: 'POST',
    body: JSON.stringify({ conversation_id: conversationId || 'default', project_id: projectId, message }),
  })
  return { role: 'assistant', content: data.answer, sources: data.citations || [], proposedAction: data.proposed_action }
}

export async function getConversations() {
  return apiFetch('/api/chat/conversations')
}
