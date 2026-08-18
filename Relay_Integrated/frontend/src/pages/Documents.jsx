import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Search, Upload, FileText, FileCode, File, Filter, Grid, List,
  Trash2, X, Plus, LoaderCircle
} from 'lucide-react'
import { createDocument, deleteDocument, getDocuments, uploadDocument } from '../services/documentsService'

const TYPE_ICONS = {
  pdf: { icon: FileText, color: 'var(--color-red)' },
  docx: { icon: File, color: 'var(--color-blue)' },
  doc: { icon: File, color: 'var(--color-blue)' },
  txt: { icon: FileText, color: 'var(--color-cyan)' },
  md: { icon: FileCode, color: 'var(--color-cyan)' },
}

const STATUS_CONFIG = {
  indexed: { label: 'Indexed', badgeClass: 'badge-green' },
  conflict: { label: 'Conflict', badgeClass: 'badge-amber' },
  processing: { label: 'Processing', badgeClass: 'badge-cyan' },
}

const CATEGORIES = ['All', 'Product', 'Engineering', 'Sales', 'HR', 'Finance', 'General']
const ACCEPTED_FILES = '.txt,.md,.pdf,.docx'

function Documents() {
  const fileInputRef = useRef(null)
  const [documents, setDocuments] = useState([])
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewMode, setViewMode] = useState('list')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState('')
  const [showNewFile, setShowNewFile] = useState(false)
  const [newFile, setNewFile] = useState({ name: 'new-document.txt', content: '', category: 'General' })
  const [creating, setCreating] = useState(false)

  const loadDocuments = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getDocuments({ project_id: 'nexora' })
      setDocuments(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message || 'Could not load documents. Make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDocuments()
  }, [])

  const handleUploadClick = () => fileInputRef.current?.click()

  const handleFiles = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const created = await uploadDocument(file, 'nexora', activeCategory === 'All' ? 'General' : activeCategory)
      setDocuments(prev => [created, ...prev])
    } catch (err) {
      setError(err.message || 'Upload failed.')
    } finally {
      setUploading(false)
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    if (!newFile.name.trim()) return
    setCreating(true)
    setError('')
    try {
      const created = await createDocument({
        project_id: 'nexora',
        name: newFile.name.trim(),
        content: newFile.content,
        category: newFile.category,
      })
      setDocuments(prev => [created, ...prev])
      setShowNewFile(false)
      setNewFile({ name: 'new-document.txt', content: '', category: 'General' })
    } catch (err) {
      setError(err.message || 'Could not create the file.')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document?')) return
    setDeletingId(id)
    setError('')
    try {
      await deleteDocument(id)
      setDocuments(prev => prev.filter(doc => doc.id !== id))
    } catch (err) {
      setError(err.message || 'Could not delete the document.')
    } finally {
      setDeletingId(null)
    }
  }

  const filtered = documents.filter(doc =>
    (activeCategory === 'All' || doc.category === activeCategory) &&
    doc.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-content section-gap" style={{ padding: '28px 32px' }}>
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FILES}
        onChange={handleFiles}
        style={{ display: 'none' }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div>
          <h1 className="text-page-title">Documents</h1>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>
            {documents.length} documents · Live from backend
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setShowNewFile(true)} style={{ gap: 8 }}>
            <Plus size={15} />
            New File
          </button>
          <button className="btn btn-primary" onClick={handleUploadClick} disabled={uploading} style={{ gap: 8 }}>
            {uploading ? <LoaderCircle size={15} className="spin" /> : <Upload size={15} />}
            {uploading ? 'Uploading...' : 'Upload Documents'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 16, padding: '11px 14px', borderRadius: 10, border: '1px solid var(--color-red)', color: 'var(--color-red)', background: 'rgba(255,70,70,0.08)', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ fontSize: 13 }}>{error}</span>
          <button onClick={() => setError('')} style={{ background: 'none', border: 0, color: 'inherit', cursor: 'pointer' }}><X size={15} /></button>
        </div>
      )}

      <div className="glass-card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
            <input className="input" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '5px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 500,
                border: '1px solid', cursor: 'pointer', transition: 'all var(--transition-fast)',
                background: activeCategory === cat ? 'var(--color-cyan-dim)' : 'transparent',
                borderColor: activeCategory === cat ? 'var(--color-cyan-border)' : 'var(--border-default)',
                color: activeCategory === cat ? 'var(--color-cyan)' : 'var(--text-secondary)',
              }}>{cat}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', padding: 3 }}>
            {[{ mode: 'list', Icon: List }, { mode: 'grid', Icon: Grid }].map(({ mode, Icon }) => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{
                width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8, border: 'none', cursor: 'pointer',
                background: viewMode === mode ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: viewMode === mode ? 'var(--text-primary)' : 'var(--text-tertiary)',
              }}><Icon size={14} /></button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="glass-card" style={{ padding: 48, textAlign: 'center', color: 'var(--text-tertiary)' }}>
          <LoaderCircle size={28} className="spin" style={{ marginBottom: 10 }} />
          <p style={{ fontSize: 14 }}>Loading documents...</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 12 }}>
          {filtered.map((doc, i) => <DocumentCard key={doc.id} doc={doc} index={i} onDelete={handleDelete} deletingId={deletingId} />)}
        </div>
      ) : (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 2fr) 80px 120px 120px 90px 110px', gap: 12, padding: '12px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
            {['Name', 'Type', 'Category', 'Updated', 'Size', 'Status'].map(h => <span key={h} className="text-label">{h}</span>)}
          </div>
          {filtered.map((doc, i) => {
            const { icon: Icon, color } = TYPE_ICONS[doc.type] || TYPE_ICONS.docx
            const status = STATUS_CONFIG[doc.status] || STATUS_CONFIG.indexed
            return (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.04 }} style={{
                display: 'grid', gridTemplateColumns: 'minmax(220px, 2fr) 80px 120px 120px 90px 110px', gap: 12,
                padding: '13px 20px', borderBottom: i < filtered.length - 1 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <Icon size={16} style={{ color, flexShrink: 0 }} strokeWidth={1.8} />
                  <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', fontWeight: 600 }}>{doc.type}</span>
                <span className="badge badge-gray" style={{ width: 'fit-content' }}>{doc.category}</span>
                <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>Just now</span>
                <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>{doc.size}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className={`badge ${status.badgeClass}`}>{status.label}</span>
                  <button title="Delete" onClick={() => handleDelete(doc.id)} disabled={deletingId === doc.id} style={{ background: 'none', border: 0, color: 'var(--text-tertiary)', cursor: 'pointer', padding: 4 }}>
                    {deletingId === doc.id ? <LoaderCircle size={14} className="spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-tertiary)' }}>
          <FileText size={32} style={{ marginBottom: 12, opacity: 0.4 }} />
          <p style={{ fontSize: 14 }}>No documents found</p>
        </div>
      )}

      {showNewFile && (
        <div onMouseDown={e => e.target === e.currentTarget && setShowNewFile(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 1000 }}>
          <form onSubmit={handleCreate} className="glass-card" style={{ width: 'min(620px, 100%)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div><h2 style={{ margin: 0, fontSize: 18 }}>New File</h2><p style={{ margin: '5px 0 0', fontSize: 12.5, color: 'var(--text-tertiary)' }}>Create a TXT or Markdown file and index it immediately.</p></div>
              <button type="button" onClick={() => setShowNewFile(false)} style={{ background: 'none', border: 0, color: 'var(--text-tertiary)', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <label style={{ display: 'block', fontSize: 12.5, marginBottom: 6 }}>File name</label>
            <input className="input" value={newFile.name} onChange={e => setNewFile({ ...newFile, name: e.target.value })} placeholder="notes.txt" style={{ width: '100%', marginBottom: 14 }} />
            <label style={{ display: 'block', fontSize: 12.5, marginBottom: 6 }}>Category</label>
            <select className="input" value={newFile.category} onChange={e => setNewFile({ ...newFile, category: e.target.value })} style={{ width: '100%', marginBottom: 14 }}>
              {CATEGORIES.filter(c => c !== 'All').map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <label style={{ display: 'block', fontSize: 12.5, marginBottom: 6 }}>Content</label>
            <textarea className="input" value={newFile.content} onChange={e => setNewFile({ ...newFile, content: e.target.value })} placeholder="Write your document content here..." rows={9} style={{ width: '100%', resize: 'vertical', marginBottom: 18 }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" className="btn" onClick={() => setShowNewFile(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={creating} style={{ gap: 8 }}>{creating ? <LoaderCircle size={15} className="spin" /> : <Plus size={15} />}{creating ? 'Creating...' : 'Create File'}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function DocumentCard({ doc, index, onDelete, deletingId }) {
  const { icon: Icon, color } = TYPE_ICONS[doc.type] || TYPE_ICONS.docx
  const status = STATUS_CONFIG[doc.status] || STATUS_CONFIG.indexed
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: index * 0.03 }} className="glass-card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
        <Icon size={20} style={{ color }} />
        <button onClick={() => onDelete(doc.id)} disabled={deletingId === doc.id} style={{ background: 'none', border: 0, color: 'var(--text-tertiary)', cursor: 'pointer' }}>{deletingId === doc.id ? <LoaderCircle size={14} className="spin" /> : <Trash2 size={14} />}</button>
      </div>
      <div style={{ marginTop: 16, fontWeight: 600, fontSize: 13.5, wordBreak: 'break-word' }}>{doc.name}</div>
      <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}><span className="badge badge-gray">{doc.category}</span><span className={`badge ${status.badgeClass}`}>{status.label}</span></div>
      <div style={{ marginTop: 12, fontSize: 12, color: 'var(--text-tertiary)' }}>{doc.type.toUpperCase()} · {doc.size}</div>
    </motion.div>
  )
}

export default Documents
