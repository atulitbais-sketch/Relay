import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Search, Command, Sparkles } from 'lucide-react'

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Your workspace at a glance' },
  '/chat': { title: 'AI Chat', subtitle: 'Powered by Relay Intelligence' },
  '/documents': { title: 'Documents', subtitle: 'Indexed knowledge base' },
  '/tasks': { title: 'Tasks', subtitle: 'Active work items' },
  '/conflicts': { title: 'Memory Conflicts', subtitle: 'Review and resolve conflicts' },
  '/settings': { title: 'Settings', subtitle: 'Workspace configuration' },
}

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchFocused, setSearchFocused] = useState(false)

  const page =
    PAGE_TITLES[location.pathname] || {
      title: 'Relay',
      subtitle: '',
    }

  return (
    <header
      className="header"
      style={{ gap: 24, justifyContent: 'space-between' }}
    >
      {/* Page Title */}
      <div style={{ flexShrink: 0 }}>
        <h1
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.2px',
            lineHeight: 1.2,
          }}
        >
          {page.title}
        </h1>

        <p
          style={{
            fontSize: 12,
            color: 'var(--text-tertiary)',
            marginTop: 1,
          }}
        >
          {page.subtitle}
        </p>
      </div>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 440, position: 'relative' }}>
        <Search
          size={14}
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-tertiary)',
            pointerEvents: 'none',
          }}
        />

        <input
          className="input"
          placeholder="Search documents, tasks, insights..."
          style={{ paddingLeft: 36, paddingRight: 80 }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />

        <div
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 6px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 6,
            opacity: searchFocused ? 0 : 1,
            transition: 'opacity var(--transition-fast)',
            pointerEvents: 'none',
          }}
        >
          <Command
            size={11}
            style={{ color: 'var(--text-tertiary)' }}
          />
          <span
            style={{
              fontSize: 11,
              color: 'var(--text-tertiary)',
              fontWeight: 500,
            }}
          >
            K
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <button
          className="btn btn-primary btn-sm"
          style={{ gap: 5 }}
          onClick={() => navigate('/chat')}
        >
          <Sparkles size={14} strokeWidth={2.5} />
          Ask AI
        </button>

        {/* Avatar */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background:
              'linear-gradient(135deg, var(--color-violet), var(--color-blue))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          SM
        </div>
      </div>
    </header>
  )
}

export default Header