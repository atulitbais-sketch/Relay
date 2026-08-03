import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Upload, FileText, FileCode, File, Filter, Grid, List, MoreHorizontal, Download, Trash2 } from 'lucide-react'

const DOCS = [
  { id: 1, name: 'Q3 Product Roadmap v2.1',    type: 'pdf',  size: '2.4 MB', category: 'Product',     updated: 'Jul 31, 2024', status: 'indexed' },
  { id: 2, name: 'Engineering Runbook v2.4',    type: 'doc',  size: '1.1 MB', category: 'Engineering', updated: 'Jul 30, 2024', status: 'indexed' },
  { id: 3, name: 'Sales Playbook 2024',         type: 'pdf',  size: '5.2 MB', category: 'Sales',       updated: 'Jul 28, 2024', status: 'indexed' },
  { id: 4, name: 'Onboarding Guide v3',         type: 'doc',  size: '872 KB', category: 'HR',          updated: 'Jul 22, 2024', status: 'conflict' },
  { id: 5, name: 'API Documentation v4.0',      type: 'code', size: '3.8 MB', category: 'Engineering', updated: 'Jul 20, 2024', status: 'indexed' },
  { id: 6, name: 'Company Finance Report Q2',   type: 'pdf',  size: '9.1 MB', category: 'Finance',     updated: 'Jul 15, 2024', status: 'indexed' },
  { id: 7, name: 'Competitor Analysis Report',  type: 'doc',  size: '1.7 MB', category: 'Product',     updated: 'Jul 10, 2024', status: 'indexed' },
  { id: 8, name: 'Platform Security Audit',     type: 'pdf',  size: '4.3 MB', category: 'Engineering', updated: 'Jul 5, 2024',  status: 'processing' },
]

const TYPE_ICONS = {
  pdf: { icon: FileText, color: 'var(--color-red)' },
  doc: { icon: File, color: 'var(--color-blue)' },
  code: { icon: FileCode, color: 'var(--color-cyan)' },
}

const STATUS_CONFIG = {
  indexed:    { label: 'Indexed',    badgeClass: 'badge-green' },
  conflict:   { label: 'Conflict',   badgeClass: 'badge-amber' },
  processing: { label: 'Processing', badgeClass: 'badge-cyan' },
}

const CATEGORIES = ['All', 'Product', 'Engineering', 'Sales', 'HR', 'Finance']

function Documents() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState('list')

  const filtered = DOCS.filter(d =>
    (activeCategory === 'All' || d.category === activeCategory) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-content section-gap" style={{ padding: '28px 32px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="text-page-title">Documents</h1>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>
            {DOCS.length} documents indexed · Last synced 5 min ago
          </p>
        </div>
        <button className="btn btn-primary" style={{ gap: 8 }}>
          <Upload size={15} />
          Upload Documents
        </button>
      </div>

      {/* Filters + Search */}
      <div className="glass-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
            <input className="input" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 999,
                  fontSize: 12.5,
                  fontWeight: 500,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  background: activeCategory === cat ? 'var(--color-cyan-dim)' : 'transparent',
                  borderColor: activeCategory === cat ? 'var(--color-cyan-border)' : 'var(--border-default)',
                  color: activeCategory === cat ? 'var(--color-cyan)' : 'var(--text-secondary)',
                }}
              >{cat}</button>
            ))}
          </div>

          {/* View Toggle */}
          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', padding: 3 }}>
            {[{ mode: 'list', Icon: List }, { mode: 'grid', Icon: Grid }].map(({ mode, Icon }) => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{
                width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8, border: 'none', cursor: 'pointer', transition: 'all var(--transition-fast)',
                background: viewMode === mode ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: viewMode === mode ? 'var(--text-primary)' : 'var(--text-tertiary)',
              }}>
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document List */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 100px 120px 120px 90px 80px', gap: 12, padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          {['Name', 'Type', 'Category', 'Updated', 'Size', 'Status'].map(h => (
            <span key={h} className="text-label">{h}</span>
          ))}
        </div>

        {/* Rows */}
        <div>
          {filtered.map((doc, i) => {
            const { icon: Icon, color } = TYPE_ICONS[doc.type] || TYPE_ICONS.doc
            const { label, badgeClass } = STATUS_CONFIG[doc.status]
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 100px 120px 120px 90px 80px',
                  gap: 12,
                  padding: '13px 20px',
                  borderBottom: i < filtered.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <Icon size={16} style={{ color, flexShrink: 0 }} strokeWidth={1.8} />
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {doc.name}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{doc.type}</span>
                <span className="badge badge-gray" style={{ width: 'fit-content' }}>{doc.category}</span>
                <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>{doc.updated}</span>
                <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>{doc.size}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`badge ${badgeClass}`}>{label}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-tertiary)' }}>
          <FileText size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p style={{ fontSize: 14 }}>No documents found</p>
        </div>
      )}
    </div>
  )
}

export default Documents
