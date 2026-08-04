import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles, BookOpen, CheckCircle2, Zap } from 'lucide-react'

function DashboardHero() {
  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const quickActions = [
    { label: 'Ask AI',          icon: Sparkles,     color: 'var(--color-cyan)',   href: '/chat' },
    { label: 'Browse Docs',     icon: BookOpen,     color: 'var(--color-blue)',   href: '/documents' },
    { label: 'View Tasks',      icon: CheckCircle2, color: 'var(--color-violet)', href: '/tasks' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(34,211,238,0.06) 0%, rgba(59,130,246,0.06) 50%, rgba(139,92,246,0.04) 100%)',
        border: '1px solid rgba(34,211,238,0.12)',
        padding: '32px 36px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.35)',
      }}
    >
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        top: -60,
        right: -60,
        width: 240,
        height: 240,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -80,
        left: 200,
        width: 300,
        height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: 24 }}>
        {/* Left: Greeting */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div className="badge badge-cyan">
              <div className="pulse-dot" style={{ background: 'var(--color-cyan)' }} />
              System Active
            </div>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.8px', lineHeight: 1.2, marginBottom: 8 }}>
            {greeting}, Sandesh 
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
            {dateStr} &nbsp;·&nbsp; {timeStr}
          </p>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {quickActions.map(({ label, icon: Icon, color, href }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                  fontSize: 13.5,
                  fontWeight: 500,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  transition: 'border-color var(--transition-fast)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = color}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-default)'}
              >
                <Icon size={14} style={{ color }} />
                {label}
                <ArrowUpRight size={12} style={{ color: 'var(--text-tertiary)', marginLeft: 2 }} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Right: Summary Stats */}
        <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
          {[
            { label: 'AI Queries Today', value: '147', color: 'var(--color-cyan)' },
            { label: 'Docs Synced',      value: '2,841', color: 'var(--color-blue)' },
            { label: 'Active Tasks',     value: '23', color: 'var(--color-violet)' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color, letterSpacing: '-1px', lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 4, fontWeight: 500 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardHero
