import { motion } from 'framer-motion'
import { Database, ChevronRight } from 'lucide-react'

const CATEGORIES = [
  { id: 'product',     label: 'Product',       count: 847,  pct: 30, color: '#22D3EE', badge: 'badge-cyan' },
  { id: 'engineering', label: 'Engineering',   count: 1124, pct: 40, color: '#3B82F6', badge: 'badge-blue' },
  { id: 'sales',       label: 'Sales',         count: 412,  pct: 15, color: '#8B5CF6', badge: 'badge-violet' },
  { id: 'hr',          label: 'HR & People',   count: 231,  pct: 8,  color: '#10B981', badge: 'badge-green' },
  { id: 'finance',     label: 'Finance',       count: 187,  pct: 7,  color: '#F59E0B', badge: 'badge-amber' },
]

function MemoryCategories() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.25 }}
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
            <Database size={15} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Memory Categories
            </h2>
            <p style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>2,801 total documents indexed</p>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ fontSize: 12.5 }}>
          Manage <ChevronRight size={12} />
        </button>
      </div>

      {/* Stacked bar */}
      <div style={{
        display: 'flex',
        height: 8,
        borderRadius: 999,
        overflow: 'hidden',
        gap: 2,
        marginBottom: 20,
      }}>
        {CATEGORIES.map(({ id, pct, color }, index) => (
          <motion.div
            key={id}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 + index * 0.08 }}
            style={{ height: '100%', background: color, borderRadius: 2 }}
          />
        ))}
      </div>

      {/* Category rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {CATEGORIES.map(({ id, label, count, pct, color, badge }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.4 + index * 0.06 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
          >
            {/* Row label + count */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
                  {count.toLocaleString()} docs
                </span>
                <span style={{ fontSize: 12, fontWeight: 600, color, minWidth: 30, textAlign: 'right' }}>
                  {pct}%
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.45 + index * 0.08 }}
                style={{ height: '100%', background: color, borderRadius: 999 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MemoryCategories
