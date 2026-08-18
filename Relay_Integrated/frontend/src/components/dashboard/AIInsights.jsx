import { motion } from 'framer-motion'
import { Sparkles, ChevronRight, Brain, TrendingUp, AlertCircle } from 'lucide-react'

const INSIGHTS = [
  {
    id: 1,
    icon: Brain,
    color: 'var(--color-cyan)',
    colorDim: 'var(--color-cyan-dim)',
    colorBorder: 'var(--color-cyan-border)',
    badge: 'Knowledge Gap',
    badgeClass: 'badge-cyan',
    title: 'Product Roadmap Fragmentation Detected',
    body: 'Your Q3 roadmap documents across Confluence and Notion have diverged significantly. 14 conflicting items found across 3 teams.',
    time: '2 min ago',
    action: 'Resolve Conflicts',
  },
  {
    id: 2,
    icon: TrendingUp,
    color: 'var(--color-green)',
    colorDim: 'var(--color-green-dim)',
    colorBorder: 'var(--color-green-border)',
    badge: 'Trend',
    badgeClass: 'badge-green',
    title: 'Engineering Documentation Coverage Up 18%',
    body: 'Your team\'s documentation coverage has improved significantly this week. 47 new API endpoints now fully documented.',
    time: '1 hr ago',
    action: 'View Report',
  },
  {
    id: 3,
    icon: AlertCircle,
    color: 'var(--color-amber)',
    colorDim: 'var(--color-amber-dim)',
    colorBorder: 'var(--color-amber-border)',
    badge: 'Action Required',
    badgeClass: 'badge-amber',
    title: 'Onboarding Docs Outdated for New Hires',
    body: '3 onboarding documents reference deprecated systems. 2 new hires starting next week may receive incorrect information.',
    time: '3 hr ago',
    action: 'Update Docs',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
      className="glass-card"
      style={{ padding: '24px 28px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-cyan-dim)',
            border: '1px solid var(--color-cyan-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={15} style={{ color: 'var(--color-cyan)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              AI Insights
            </h2>
            <p style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>Relay Intelligence · Updated now</p>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ fontSize: 12.5 }}>
          View All
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Insights List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      >
        {INSIGHTS.map(insight => {
          const { icon: Icon, color, colorDim, colorBorder, badge, badgeClass, title, body, time, action } = insight
          return (
            <motion.div
              key={insight.id}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              style={{
                display: 'flex',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'border-color var(--transition-fast), background var(--transition-fast)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = colorBorder
                e.currentTarget.style.background = colorDim
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-subtle)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              {/* Icon */}
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 'var(--radius-md)',
                background: colorDim,
                border: `1px solid ${colorBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 2,
              }}>
                <Icon size={16} style={{ color }} strokeWidth={1.8} />
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                  <span className={`badge ${badgeClass}`}>{badge}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{time}</span>
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.35 }}>
                  {title}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 10 }}>
                  {body}
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 10px', fontSize: 12, color }}
                >
                  {action}
                  <ChevronRight size={11} />
                </button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default AIInsights
