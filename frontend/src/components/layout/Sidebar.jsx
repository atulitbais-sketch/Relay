import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  CheckSquare,
  AlertTriangle,
  Zap,
  ChevronRight,
} from 'lucide-react'

const NAV_ITEMS = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat',       icon: MessageSquare,   label: 'AI Chat' },
  { to: '/documents',  icon: FileText,         label: 'Documents' },
  { to: '/tasks',      icon: CheckSquare,      label: 'Tasks' },
  { to: '/conflicts',  icon: AlertTriangle,    label: 'Memory Conflicts' },
]



function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink to={to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
      {({ isActive }) => (
        <>
          <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div style={{ padding: '20px 20px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: 'linear-gradient(135deg, var(--color-cyan) 0%, var(--color-blue) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(34, 211, 238, 0.3)',
            flexShrink: 0,
          }}>
            <Zap size={16} strokeWidth={2.5} color="#050811" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.2px' }}>
              Relay
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 500, letterSpacing: '0.02em' }}>
              Enterprise AI
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider" style={{ margin: '8px 20px 12px' }} />

      {/* Workspace Pill */}
      <div style={{ padding: '0 12px 4px' }}>
        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          transition: 'background var(--transition-fast)',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              fontWeight: 700,
              color: 'white',
            }}>N</div>
            <span style={{ fontSize: 13, fontWeight: 500 }}>Nexora Technologies</span>
          </div>
          <ChevronRight size={13} />
        </button>
      </div>

      {/* Nav Label */}
      <div style={{ padding: '16px 20px 6px' }}>
        <span className="text-label">Navigation</span>
      </div>

      {/* Main Nav */}
      <nav style={{ padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => (
          <NavItem key={item.to} {...item} />
        ))}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Storage indicator */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>Memory Used</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-cyan)' }}>68%</span>
          </div>
          <div style={{ height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '68%' }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
              style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, var(--color-cyan), var(--color-blue))' }}
            />
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: 'var(--text-tertiary)' }}>
            34.2 GB of 50 GB
          </div>
        </div>
      </div>


      {/* User Row */}
      <div style={{ padding: '8px 12px 16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 10px',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          transition: 'background var(--transition-fast)',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-violet), var(--color-blue))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: 'white',
            flexShrink: 0,
          }}>SM</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              Sandesh Mutadak
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              sandesh@Nexoratech.com
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
