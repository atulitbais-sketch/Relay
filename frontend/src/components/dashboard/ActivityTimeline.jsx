import { motion } from 'framer-motion'
import { Clock, FileText, CheckSquare, MessageSquare, AlertTriangle, Upload, ChevronRight } from 'lucide-react'

const EVENTS = [
  {
    id: 1,
    icon: MessageSquare,
    color: 'var(--color-cyan)',
    colorDim: 'var(--color-cyan-dim)',
    colorBorder: 'var(--color-cyan-border)',
    title: 'AI answered query about Q3 strategy',
    meta: 'AI Chat · Jane Doe',
    time: '5m ago',
  },
  {
    id: 2,
    icon: FileText,
    color: 'var(--color-blue)',
    colorDim: 'var(--color-blue-dim)',
    colorBorder: 'var(--color-blue-border)',
    title: 'Engineering Runbook v2.4 indexed',
    meta: 'Documents · Auto-sync',
    time: '18m ago',
  },
  {
    id: 3,
    icon: CheckSquare,
    color: 'var(--color-green)',
    colorDim: 'var(--color-green-dim)',
    colorBorder: 'var(--color-green-border)',
    title: 'Task "Update API docs" marked complete',
    meta: 'Tasks · Marcus Lee',
    time: '41m ago',
  },
  {
    id: 4,
    icon: AlertTriangle,
    color: 'var(--color-amber)',
    colorDim: 'var(--color-amber-dim)',
    colorBorder: 'var(--color-amber-border)',
    title: 'Memory conflict detected in Sales KB',
    meta: 'Memory Conflicts · System',
    time: '1h ago',
  },
  {
    id: 5,
    icon: Upload,
    color: 'var(--color-violet)',
    colorDim: 'var(--color-violet-dim)',
    colorBorder: 'var(--color-violet-border)',
    title: '12 documents uploaded from Drive',
    meta: 'Documents · Sarah Kim',
    time: '2h ago',
  },
  {
    id: 6,
    icon: MessageSquare,
    color: 'var(--color-cyan)',
    colorDim: 'var(--color-cyan-dim)',
    colorBorder: 'var(--color-cyan-border)',
    title: 'AI summarized competitor analysis report',
    meta: 'AI Chat · David Park',
    time: '3h ago',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
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
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--border-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Clock size={15} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Recent Activity
            </h2>
            <p style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>Last 3 hours · All sources</p>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ fontSize: 12.5 }}>
          View All <ChevronRight size={12} />
        </button>
      </div>

      {/* Timeline */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
      >
        {EVENTS.map((event, index) => {
          const { icon: Icon, color, colorDim, colorBorder, title, meta, time } = event
          const isLast = index === EVENTS.length - 1
          return (
            <motion.div
              key={event.id}
              variants={itemVariants}
              style={{ display: 'flex', gap: 14, position: 'relative' }}
            >
              {/* Timeline line */}
              {!isLast && (
                <div style={{
                  position: 'absolute',
                  left: 15,
                  top: 32,
                  bottom: 0,
                  width: 1,
                  background: 'var(--border-subtle)',
                  zIndex: 0,
                }} />
              )}

              {/* Icon */}
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: colorDim,
                border: `1px solid ${colorBorder}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 10,
                position: 'relative',
                zIndex: 1,
              }}>
                <Icon size={14} style={{ color }} strokeWidth={1.8} />
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                padding: '10px 0 16px',
                borderBottom: !isLast ? '1px solid var(--border-subtle)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4, flex: 1 }}>
                    {title}
                  </div>
                  <span style={{ fontSize: 11.5, color: 'var(--text-tertiary)', flexShrink: 0, fontWeight: 500 }}>
                    {time}
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 3 }}>
                  {meta}
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default ActivityTimeline
