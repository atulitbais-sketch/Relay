import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, X, ChevronRight, GitMerge, Search } from 'lucide-react'

const CONFLICTS = [
  {
    id: 1,
    title: 'SSO Integration Timeline Mismatch',
    severity: 'high',
    source1: { name: 'Q3 Roadmap v2.1', excerpt: 'SSO integration GA target: August 15, 2024' },
    source2: { name: 'Engineering Planning Doc', excerpt: 'SSO integration GA target: September 1, 2024' },
    affectedTeams: ['Product', 'Engineering'],
    detected: 'Jul 31, 2024',
    status: 'open',
  },
  {
    id: 2,
    title: 'Onboarding Process for Remote Employees',
    severity: 'medium',
    source1: { name: 'HR Onboarding Guide v3', excerpt: 'Remote employees complete 2-week in-person orientation' },
    source2: { name: 'Remote Work Policy 2024', excerpt: 'Remote employees complete orientation fully online' },
    affectedTeams: ['HR', 'People Ops'],
    detected: 'Jul 29, 2024',
    status: 'open',
  },
  {
    id: 3,
    title: 'Data Retention Policy Duration',
    severity: 'medium',
    source1: { name: 'Security Policy v4', excerpt: 'Customer data retained for 24 months post-cancellation' },
    source2: { name: 'Legal Compliance Doc 2024', excerpt: 'Customer data retained for 36 months post-cancellation' },
    affectedTeams: ['Legal', 'Engineering'],
    detected: 'Jul 27, 2024',
    status: 'open',
  },
  {
    id: 4,
    title: 'Pricing Tier Feature Allocation',
    severity: 'low',
    source1: { name: 'Product Pricing v1.8', excerpt: 'API access included in Professional plan ($49/mo)' },
    source2: { name: 'Sales Pricing Sheet', excerpt: 'API access available from Business plan ($99/mo) onwards' },
    affectedTeams: ['Sales', 'Product'],
    detected: 'Jul 25, 2024',
    status: 'resolved',
  },
  {
    id: 5,
    title: 'Incident Response SLA Times',
    severity: 'high',
    source1: { name: 'SLA Agreement v2', excerpt: 'P0 incidents: 1-hour response SLA' },
    source2: { name: 'Engineering Runbook v2.4', excerpt: 'P0 incidents: 30-minute response target' },
    affectedTeams: ['Engineering', 'Customer Success'],
    detected: 'Jul 23, 2024',
    status: 'resolved',
  },
]

const SEVERITY_CONFIG = {
  high:   { color: 'var(--color-red)',   bg: 'var(--color-red-dim)',   border: 'var(--color-red-border)',   label: 'High' },
  medium: { color: 'var(--color-amber)', bg: 'var(--color-amber-dim)', border: 'var(--color-amber-border)', label: 'Medium' },
  low:    { color: 'var(--color-green)', bg: 'var(--color-green-dim)', border: 'var(--color-green-border)', label: 'Low' },
}

function ConflictCard({ conflict, index }) {
  const [expanded, setExpanded] = useState(false)
  const sev = SEVERITY_CONFIG[conflict.severity]
  const isResolved = conflict.status === 'resolved'

  return (
    <motion.div
      key={conflict.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="glass-card"
      style={{ padding: '20px 24px', opacity: isResolved ? 0.65 : 1 }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Severity icon */}
        <div style={{
          width: 36, height: 36, borderRadius: 'var(--radius-md)', flexShrink: 0,
          background: sev.bg, border: `1px solid ${sev.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {isResolved
            ? <CheckCircle2 size={17} style={{ color: 'var(--color-green)' }} />
            : <AlertTriangle size={17} style={{ color: sev.color }} strokeWidth={2} />
          }
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999,
                  background: sev.bg, color: sev.color, border: `1px solid ${sev.border}`,
                }}>{sev.label} Severity</span>
                {isResolved && <span className="badge badge-green">Resolved</span>}
                {conflict.affectedTeams.map(t => (
                  <span key={t} className="badge badge-gray">{t}</span>
                ))}
              </div>
              <h3 style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {conflict.title}
              </h3>
            </div>
            <span style={{ fontSize: 11.5, color: 'var(--text-tertiary)', flexShrink: 0 }}>
              Detected {conflict.detected}
            </span>
          </div>

          {/* Sources */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginTop: 12 }}>
            {[conflict.source1, conflict.source2].map((src, i) => (
              <>
                <div key={`src-${i}`} style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${i === 0 ? 'rgba(59,130,246,0.2)' : 'rgba(139,92,246,0.2)'}`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? 'var(--color-blue)' : 'var(--color-violet)', marginBottom: 4 }}>
                    {src.name}
                  </div>
                  <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.4, fontStyle: 'italic' }}>
                    "{src.excerpt}"
                  </p>
                </div>
                {i === 0 && (
                  <div key="vs" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-default)',
                    fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)',
                    flexShrink: 0,
                  }}>VS</div>
                )}
              </>
            ))}
          </div>

          {/* Actions */}
          {!isResolved && (
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" style={{ gap: 6 }}>
                <GitMerge size={13} />
                Resolve Conflict
              </button>
              <button className="btn btn-secondary btn-sm">
                View Details
              </button>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }}>
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function MemoryConflicts() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const openConflicts = CONFLICTS.filter(c => c.status === 'open')
  const resolvedConflicts = CONFLICTS.filter(c => c.status === 'resolved')

  const filtered = CONFLICTS.filter(c => {
    const matchFilter = filter === 'all' || c.status === filter || c.severity === filter
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="page-content section-gap" style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="text-page-title">Memory Conflicts</h1>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>
            {openConflicts.length} open · {resolvedConflicts.length} resolved this week
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="badge badge-red" style={{ alignSelf: 'center', fontSize: 12 }}>
            <div className="pulse-dot" style={{ background: 'var(--color-red)' }} />
            {openConflicts.length} Requiring Attention
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'Open Conflicts', value: openConflicts.length, color: 'var(--color-red)' },
          { label: 'High Severity',  value: CONFLICTS.filter(c => c.severity === 'high' && c.status === 'open').length, color: 'var(--color-amber)' },
          { label: 'Resolved Today', value: resolvedConflicts.length, color: 'var(--color-green)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontSize: 24, fontWeight: 800, color, letterSpacing: '-0.5px' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 320 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
          <input className="input" placeholder="Search conflicts..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'open', 'resolved', 'high', 'medium'].map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '5px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 500,
                border: '1px solid', cursor: 'pointer', transition: 'all var(--transition-fast)',
                textTransform: 'capitalize',
                background: filter === f ? 'var(--color-cyan-dim)' : 'transparent',
                borderColor: filter === f ? 'var(--color-cyan-border)' : 'var(--border-default)',
                color: filter === f ? 'var(--color-cyan)' : 'var(--text-secondary)',
              }}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* Conflicts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map((conflict, i) => (
          <ConflictCard key={conflict.id} conflict={conflict} index={i} />
        ))}
      </div>
    </div>
  )
}

export default MemoryConflicts
