import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Calendar, User, Flag, CheckCircle2, Clock, Circle } from 'lucide-react'

const TASKS = [
  { id: 1,  title: 'Update API documentation for v4.0',          status: 'completed',   priority: 'high',   assignee: 'Marcus Lee',  due: 'Jul 31', project: 'Engineering', tags: ['docs', 'api'] },
  { id: 2,  title: 'Review and resolve 3 memory conflicts in Sales KB', status: 'in-progress', priority: 'high', assignee: 'Jane Doe', due: 'Aug 2', project: 'Sales', tags: ['conflict'] },
  { id: 3,  title: 'Onboard new engineers to Relay platform',     status: 'in-progress', priority: 'medium', assignee: 'Sarah Kim',   due: 'Aug 5', project: 'HR',          tags: ['onboarding'] },
  { id: 4,  title: 'Audit Finance documents for Q3 accuracy',     status: 'todo',        priority: 'medium', assignee: 'David Park',  due: 'Aug 8', project: 'Finance',     tags: ['audit'] },
  { id: 5,  title: 'Build AI query templates for Sales team',     status: 'todo',        priority: 'low',    assignee: 'Jane Doe',    due: 'Aug 10', project: 'Product',    tags: ['ai', 'sales'] },
  { id: 6,  title: 'Set up Confluence integration',               status: 'todo',        priority: 'high',   assignee: 'Marcus Lee',  due: 'Aug 3', project: 'Engineering', tags: ['integration'] },
  { id: 7,  title: 'Publish Q3 roadmap to internal wiki',         status: 'todo',        priority: 'medium', assignee: 'Jane Doe',    due: 'Aug 4', project: 'Product',     tags: ['roadmap'] },
]

const STATUS_CONFIG = {
  completed:   { label: 'Done',        badgeClass: 'badge-green',  icon: CheckCircle2, color: 'var(--color-green)' },
  'in-progress': { label: 'In Progress', badgeClass: 'badge-cyan',   icon: Clock,        color: 'var(--color-cyan)' },
  todo:        { label: 'To Do',       badgeClass: 'badge-gray',   icon: Circle,       color: 'var(--text-tertiary)' },
}

const PRIORITY_CONFIG = {
  high:   { label: 'High',   color: 'var(--color-red)',    bg: 'var(--color-red-dim)',    border: 'var(--color-red-border)' },
  medium: { label: 'Medium', color: 'var(--color-amber)',  bg: 'var(--color-amber-dim)',  border: 'var(--color-amber-border)' },
  low:    { label: 'Low',    color: 'var(--color-green)',  bg: 'var(--color-green-dim)',  border: 'var(--color-green-border)' },
}

const STATUS_GROUPS = ['todo', 'in-progress', 'completed']
const STATUS_LABELS = { todo: 'To Do', 'in-progress': 'In Progress', completed: 'Done' }

function Tasks() {
  const [search, setSearch] = useState('')

  const filtered = TASKS.filter(t => t.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="page-content section-gap" style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="text-page-title">Tasks</h1>
          <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>
            {TASKS.filter(t => t.status !== 'completed').length} active · {TASKS.filter(t => t.status === 'completed').length} completed
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={15} />
          New Task
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 400 }}>
        <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)', pointerEvents: 'none' }} />
        <input className="input" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34 }} />
      </div>

      {/* Kanban-style groups */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'start' }}>
        {STATUS_GROUPS.map(status => {
          const { icon: StatusIcon, color } = STATUS_CONFIG[status]
          const groupTasks = filtered.filter(t => t.status === status)
          return (
            <div key={status}>
              {/* Column header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <StatusIcon size={14} style={{ color }} strokeWidth={2} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  {STATUS_LABELS[status]}
                </span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 11.5,
                  fontWeight: 600,
                  padding: '1px 7px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.07)',
                  color: 'var(--text-tertiary)',
                }}>
                  {groupTasks.length}
                </span>
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {groupTasks.map((task, i) => {
                  const priority = PRIORITY_CONFIG[task.priority]
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.06 }}
                      whileHover={{ scale: 1.01, y: -1 }}
                      className="glass-card"
                      style={{ padding: '16px', cursor: 'pointer' }}
                    >
                      {/* Priority + Project */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 8px',
                          borderRadius: 999,
                          background: priority.bg,
                          color: priority.color,
                          border: `1px solid ${priority.border}`,
                        }}>
                          {priority.label}
                        </span>
                        <span className="badge badge-gray">{task.project}</span>
                      </div>

                      {/* Title */}
                      <p style={{
                        fontSize: 13.5,
                        fontWeight: 500,
                        color: task.status === 'completed' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                        textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                        lineHeight: 1.4,
                        marginBottom: 12,
                      }}>
                        {task.title}
                      </p>

                      {/* Footer */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-violet), var(--color-blue))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 9, fontWeight: 700, color: 'white',
                          }}>
                            {task.assignee.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{task.assignee}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: 'var(--text-tertiary)' }}>
                          <Calendar size={11} />
                          {task.due}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}

                {groupTasks.length === 0 && (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 12.5, border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-xl)' }}>
                    No tasks
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tasks
