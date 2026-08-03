import { motion } from 'framer-motion'
import { FileText, CheckSquare, AlertTriangle, Lightbulb, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const STATS = [
  {
    id: 'documents',
    label: 'Documents Indexed',
    value: '2,841',
    change: '+124',
    changeLabel: 'this week',
    trend: 'up',
    icon: FileText,
    color: 'var(--color-blue)',
    colorDim: 'var(--color-blue-dim)',
    colorBorder: 'var(--color-blue-border)',
    description: 'Across all knowledge bases',
  },
  {
    id: 'tasks',
    label: 'Active Tasks',
    value: '23',
    change: '+5',
    changeLabel: 'since yesterday',
    trend: 'up',
    icon: CheckSquare,
    color: 'var(--color-violet)',
    colorDim: 'var(--color-violet-dim)',
    colorBorder: 'var(--color-violet-border)',
    description: 'Across 4 projects',
  },
  {
    id: 'conflicts',
    label: 'Memory Conflicts',
    value: '7',
    change: '-3',
    changeLabel: 'resolved today',
    trend: 'down-good',
    icon: AlertTriangle,
    color: 'var(--color-amber)',
    colorDim: 'var(--color-amber-dim)',
    colorBorder: 'var(--color-amber-border)',
    description: 'Requires review',
  },
  {
    id: 'insights',
    label: 'Insights Generated',
    value: '384',
    change: '+47',
    changeLabel: 'this week',
    trend: 'up',
    icon: Lightbulb,
    color: 'var(--color-green)',
    colorDim: 'var(--color-green-dim)',
    colorBorder: 'var(--color-green-border)',
    description: 'AI-generated',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function TrendIcon({ trend }) {
  if (trend === 'up') return <TrendingUp size={12} />
  if (trend === 'down-good') return <TrendingDown size={12} />
  return <Minus size={12} />
}

function StatCard({ stat }) {
  const { label, value, change, changeLabel, trend, icon: Icon, color, colorDim, colorBorder, description } = stat
  const isTrendGood = trend === 'up' || trend === 'down-good'
  const trendColor = isTrendGood ? 'var(--color-green)' : 'var(--color-red)'

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.15 }}
      className="glass-card stat-card"
      style={{ padding: '24px', cursor: 'default' }}
    >
      {/* Top Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-md)',
          background: colorDim,
          border: `1px solid ${colorBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Icon size={18} style={{ color }} strokeWidth={1.8} />
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '3px 8px',
          borderRadius: 999,
          background: isTrendGood ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
          border: `1px solid ${isTrendGood ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
          color: trendColor,
          fontSize: 11.5,
          fontWeight: 600,
        }}>
          <TrendIcon trend={trend} />
          {change}
        </div>
      </div>

      {/* Value */}
      <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-1.5px', lineHeight: 1, marginBottom: 6 }}>
        {value}
      </div>

      {/* Label */}
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 4 }}>
        {label}
      </div>

      {/* Description */}
      <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>
        {description} · <span style={{ color: trendColor }}>{changeLabel}</span>
      </div>

      {/* Accent line */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        borderRadius: '0 0 var(--radius-xl) var(--radius-xl)',
        background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        pointerEvents: 'none',
      }} />
    </motion.div>
  )
}

function DashboardStats() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
    >
      {STATS.map(stat => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </motion.div>
  )
}

export default DashboardStats
