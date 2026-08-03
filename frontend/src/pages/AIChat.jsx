import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Plus, Paperclip, Copy, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react'

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    content: 'Hello! I\'m Relay Intelligence, your enterprise AI assistant. I have access to your organization\'s knowledge base including 2,841 indexed documents across Product, Engineering, Sales, HR, and Finance. What would you like to know?',
    time: '10:24 AM',
  },
  {
    id: 2,
    role: 'user',
    content: 'Summarize the Q3 product roadmap priorities.',
    time: '10:25 AM',
  },
  {
    id: 3,
    role: 'assistant',
    content: 'Based on the Q3 2024 Product Roadmap (v2.1, last updated June 18), here are the top priorities:\n\n**1. AI-Powered Search (P0)**\nComplete the semantic search overhaul across all product surfaces. Target: 3x improvement in result relevancy. Owner: Platform team.\n\n**2. Enterprise SSO & SCIM (P0)**\nFull SAML 2.0 + SCIM provisioning for enterprise customers. Unblocks 4 major deals in pipeline. Target: GA by Aug 15.\n\n**3. Document Collaboration (P1)**\nReal-time co-editing with conflict resolution. Currently in private beta with 3 customers.\n\n**4. Mobile App (P2)**\niOS and Android apps for knowledge access on-the-go. Design complete, development 40% done.\n\n*Note: I detected a conflict between this document and the Engineering Planning doc from June 22. The conflict concerns the SSO timeline — would you like me to flag this for review?*',
    time: '10:25 AM',
    sources: ['Q3 Roadmap v2.1', 'Engineering Planning Doc', 'Product OKRs Q3'],
  },
]

const SUGGESTIONS = [
  'What are our top sales blockers this week?',
  'Summarize the latest engineering standup notes',
  'What tasks are overdue in the roadmap?',
]

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        gap: 12,
        alignItems: 'flex-start',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        background: isUser
          ? 'linear-gradient(135deg, var(--color-violet), var(--color-blue))'
          : 'linear-gradient(135deg, var(--color-cyan), var(--color-blue))',
        color: isUser ? 'white' : '#050811',
        boxShadow: isUser ? 'none' : '0 0 12px rgba(34,211,238,0.2)',
      }}>
        {isUser ? 'JD' : <Sparkles size={13} strokeWidth={2} />}
      </div>

      {/* Bubble */}
      <div style={{ maxWidth: '72%', minWidth: 0 }}>
        <div style={{
          padding: '12px 16px',
          borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
          background: isUser
            ? 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(59,130,246,0.2))'
            : 'rgba(255,255,255,0.05)',
          border: isUser
            ? '1px solid rgba(139,92,246,0.25)'
            : '1px solid var(--border-default)',
          fontSize: 14,
          color: 'var(--text-primary)',
          lineHeight: 1.65,
          whiteSpace: 'pre-wrap',
        }}>
          {msg.content.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
            /^\*\*[^*]+\*\*$/.test(part)
              ? <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>
              : <span key={i}>{part}</span>
          )}
        </div>

        {/* Sources */}
        {msg.sources && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            <span style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginRight: 2 }}>Sources:</span>
            {msg.sources.map(s => (
              <span key={s} className="badge badge-gray">{s}</span>
            ))}
          </div>
        )}

        {/* Actions (assistant only) */}
        {!isUser && (
          <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
            {[
              { icon: Copy, title: 'Copy' },
              { icon: ThumbsUp, title: 'Good' },
              { icon: ThumbsDown, title: 'Bad' },
              { icon: RotateCcw, title: 'Regenerate' },
            ].map(({ icon: Icon, title }) => (
              <button key={title} title={title} style={{
                width: 28, height: 28,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                border: '1px solid transparent',
                color: 'var(--text-tertiary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)' }}
              >
                <Icon size={13} />
              </button>
            ))}
          </div>
        )}

        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4, textAlign: isUser ? 'right' : 'left' }}>
          {msg.time}
        </div>
      </div>
    </motion.div>
  )
}

function AIChat() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    const userMsg = { id: Date.now(), role: 'user', content: text, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'I\'ve searched across your knowledge base and found relevant information. Based on your indexed documents, here\'s what I found...\n\nThis feature is connected to the live service layer. Once the backend is integrated, I\'ll retrieve real-time answers from your organization\'s documents.',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      }])
    }, 1800)
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--header-height))', overflow: 'hidden' }}>
      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {messages.map(msg => <Message key={msg.id} msg={msg} />)}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-cyan), var(--color-blue))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Sparkles size={13} strokeWidth={2} color="#050811" />
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '4px 16px 16px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-default)',
                  display: 'flex', gap: 5, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-cyan)' }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length < 4 && (
          <div style={{ padding: '0 32px 12px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => setInput(s)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                  fontSize: 12.5,
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-cyan-border)'; e.currentTarget.style.color = 'var(--color-cyan)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ padding: '12px 32px 24px' }}>
          <div style={{
            display: 'flex',
            gap: 10,
            alignItems: 'flex-end',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: '12px 16px',
            transition: 'border-color var(--transition-fast)',
          }}
            onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--color-cyan-border)'}
            onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
          >
            <button style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
              <Paperclip size={16} />
            </button>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              placeholder="Ask Relay anything about your knowledge base..."
              rows={1}
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit',
                resize: 'none', lineHeight: 1.6, maxHeight: 120, overflowY: 'auto',
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                width: 34, height: 34, borderRadius: 'var(--radius-md)', flexShrink: 0,
                background: input.trim() ? 'var(--color-cyan)' : 'rgba(255,255,255,0.08)',
                border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: input.trim() ? '#050811' : 'var(--text-tertiary)',
                transition: 'all var(--transition-fast)',
              }}
            >
              <Send size={15} strokeWidth={2} />
            </button>
          </div>
          <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 8 }}>
            Relay AI · Searches across all indexed documents · Press Enter to send
          </div>
        </div>
      </div>

      {/* Right Sidebar — Context */}
      <div style={{
        width: 280,
        borderLeft: '1px solid var(--border-subtle)',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        overflowY: 'auto',
      }}>
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            Active Knowledge Bases
          </h3>
          {[
            { name: 'Product Wiki', docs: 847, color: 'var(--color-cyan)' },
            { name: 'Engineering KB', docs: 1124, color: 'var(--color-blue)' },
            { name: 'Sales Playbook', docs: 412, color: 'var(--color-violet)' },
          ].map(({ name, docs, color }) => (
            <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: 2, background: color }} />
                <span style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{name}</span>
              </div>
              <span style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>{docs.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            Recent Conversations
          </h3>
          {[
            { title: 'Q3 Roadmap Summary', time: '10:24 AM' },
            { title: 'Sales Pipeline Analysis', time: 'Yesterday' },
            { title: 'Incident Post-mortem', time: 'Jul 31' },
          ].map(({ title, time }) => (
            <div key={title}
              style={{ padding: '8px 10px', borderRadius: 'var(--radius-md)', cursor: 'pointer', marginBottom: 4, transition: 'background var(--transition-fast)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', fontWeight: 500 }}>{title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 2 }}>{time}</div>
            </div>
          ))}
        </div>

        <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
          <Plus size={14} />
          New Conversation
        </button>
      </div>
    </div>
  )
}

export default AIChat
