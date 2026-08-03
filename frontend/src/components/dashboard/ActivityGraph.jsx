import { motion } from 'framer-motion'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const DATA = [
  { day: 'Mon', queries: 82,  documents: 12, insights: 34 },
  { day: 'Tue', queries: 118, documents: 19, insights: 41 },
  { day: 'Wed', queries: 94,  documents: 8,  insights: 38 },
  { day: 'Thu', queries: 147, documents: 24, insights: 55 },
  { day: 'Fri', queries: 131, documents: 31, insights: 62 },
  { day: 'Sat', queries: 56,  documents: 4,  insights: 21 },
  { day: 'Sun', queries: 73,  documents: 7,  insights: 29 },
]

const METRICS = [
  { key: 'queries',   label: 'AI Queries',  color: '#22D3EE' },
  { key: 'documents', label: 'Documents',   color: '#3B82F6' },
  { key: 'insights',  label: 'Insights',    color: '#8B5CF6' },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
          <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{p.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 12 }}>{p.value}</span>
        </div>
      ))}
    </div>
  )
}

function ActivityGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      className="glass-card"
      style={{ padding: '24px 28px' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>
            Activity Overview
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Last 7 days · All activity types</p>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 16 }}>
          {METRICS.map(({ key, label, color }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: color }} />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            {METRICS.map(({ key, color }) => (
              <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.08)', strokeWidth: 1 }} />
          {METRICS.map(({ key, label, color }) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              name={label}
              stroke={color}
              strokeWidth={2}
              fill={`url(#grad-${key})`}
              dot={false}
              activeDot={{ r: 4, fill: color, stroke: 'var(--bg-primary)', strokeWidth: 2 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export default ActivityGraph
