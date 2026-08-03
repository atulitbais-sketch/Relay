import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building, Shield, Bell, Link, Palette, ChevronRight, Check, Key, Webhook } from 'lucide-react'

const NAV_SECTIONS = [
  { id: 'profile',       icon: User,     label: 'Profile' },
  { id: 'workspace',     icon: Building, label: 'Workspace' },
  { id: 'security',      icon: Shield,   label: 'Security' },
  { id: 'notifications', icon: Bell,     label: 'Notifications' },
  { id: 'integrations',  icon: Link,     label: 'Integrations' },
  { id: 'appearance',    icon: Palette,  label: 'Appearance' },
]

const INTEGRATIONS = [
  { name: 'Confluence',    description: 'Sync pages and spaces',    connected: true,  logo: '🔷' },
  { name: 'Notion',        description: 'Import workspace content',  connected: true,  logo: '⬜' },
  { name: 'Google Drive',  description: 'Sync Drive documents',      connected: false, logo: '📁' },
  { name: 'Slack',         description: 'Send notifications',         connected: true,  logo: '💬' },
  { name: 'GitHub',        description: 'Index code documentation',   connected: false, logo: '🐙' },
  { name: 'Jira',          description: 'Sync tasks and issues',      connected: false, logo: '🔵' },
]

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        width: 40, height: 22, borderRadius: 999, border: 'none', cursor: 'pointer',
        background: checked ? 'var(--color-cyan)' : 'rgba(255,255,255,0.12)',
        position: 'relative', transition: 'background var(--transition-base)',
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: checked ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{ position: 'absolute', top: 3, width: 16, height: 16, borderRadius: '50%', background: 'white' }}
      />
    </button>
  )
}

function SettingRow({ label, description, control }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{label}</div>
        {description && <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{description}</div>}
      </div>
      <div style={{ flexShrink: 0, marginLeft: 24 }}>{control}</div>
    </div>
  )
}

function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [notifications, setNotifications] = useState({ email: true, slack: true, digest: false, conflicts: true })
  const [name, setName] = useState('Jane Doe')
  const [email, setEmail] = useState('jane@acme.com')
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - var(--header-height))' }}>
      {/* Settings Nav */}
      <div style={{
        width: 220,
        padding: '24px 16px',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flexShrink: 0,
      }}>
        <p className="text-label" style={{ padding: '4px 8px', marginBottom: 4 }}>Settings</p>
        {NAV_SECTIONS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 9, padding: '8px 10px',
              borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
              fontSize: 13.5, fontWeight: 500, width: '100%', textAlign: 'left',
              transition: 'all var(--transition-fast)',
              background: activeSection === id ? 'rgba(34,211,238,0.1)' : 'transparent',
              color: activeSection === id ? 'var(--color-cyan)' : 'var(--text-secondary)',
            }}
          >
            <Icon size={15} strokeWidth={activeSection === id ? 2.2 : 1.8} />
            {label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', maxWidth: 720 }}>
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Profile */}
          {activeSection === 'profile' && (
            <div>
              <h2 className="text-page-title" style={{ fontSize: 20, marginBottom: 4 }}>Profile</h2>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 28 }}>Manage your personal account details</p>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32, padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-violet), var(--color-blue))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, fontWeight: 700, color: 'white', flexShrink: 0,
                }}>JD</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 10 }}>{email}</div>
                  <button className="btn btn-secondary btn-sm">Change Photo</button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Full Name', value: name, setter: setName },
                  { label: 'Email Address', value: email, setter: setEmail },
                ].map(({ label, value, setter }) => (
                  <div key={label}>
                    <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{label}</label>
                    <input className="input" value={value} onChange={e => setter(e.target.value)} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Role</label>
                  <input className="input" value="Admin" readOnly style={{ opacity: 0.6 }} />
                </div>
              </div>

              <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
                <button className="btn btn-primary" onClick={handleSave}>
                  {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
                </button>
                <button className="btn btn-secondary">Cancel</button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div>
              <h2 className="text-page-title" style={{ fontSize: 20, marginBottom: 4 }}>Notifications</h2>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 28 }}>Control how and when you receive alerts</p>
              <div className="glass-card" style={{ padding: '4px 20px' }}>
                <SettingRow label="Email notifications" description="Receive updates via email" control={<Toggle checked={notifications.email} onChange={v => setNotifications(n => ({ ...n, email: v }))} />} />
                <SettingRow label="Slack notifications" description="Send alerts to your Slack workspace" control={<Toggle checked={notifications.slack} onChange={v => setNotifications(n => ({ ...n, slack: v }))} />} />
                <SettingRow label="Weekly digest" description="Summary of activity every Monday" control={<Toggle checked={notifications.digest} onChange={v => setNotifications(n => ({ ...n, digest: v }))} />} />
                <SettingRow label="Memory conflict alerts" description="Instant alerts when conflicts are detected" control={<Toggle checked={notifications.conflicts} onChange={v => setNotifications(n => ({ ...n, conflicts: v }))} />} />
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeSection === 'integrations' && (
            <div>
              <h2 className="text-page-title" style={{ fontSize: 20, marginBottom: 4 }}>Integrations</h2>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 28 }}>Connect your tools to Relay</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {INTEGRATIONS.map(({ name, description, connected, logo }) => (
                  <div key={name} className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontSize: 28, flexShrink: 0 }}>{logo}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{name}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>{description}</div>
                    </div>
                    <button className={`btn btn-sm ${connected ? 'btn-secondary' : 'btn-primary'}`} style={{ minWidth: 100 }}>
                      {connected ? <><Check size={13} /> Connected</> : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeSection === 'security' && (
            <div>
              <h2 className="text-page-title" style={{ fontSize: 20, marginBottom: 4 }}>Security</h2>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 28 }}>Manage authentication and access controls</p>
              <div className="glass-card" style={{ padding: '4px 20px', marginBottom: 16 }}>
                <SettingRow label="Two-Factor Authentication" description="Adds an extra layer of security to your account" control={<span className="badge badge-green"><Check size={10} /> Enabled</span>} />
                <SettingRow label="SSO via SAML 2.0" description="Single sign-on for your organization" control={<span className="badge badge-green"><Check size={10} /> Active</span>} />
                <SettingRow label="API Keys" description="Manage programmatic access" control={<button className="btn btn-secondary btn-sm"><Key size={13} /> Manage</button>} />
              </div>
              <div className="glass-card" style={{ padding: '16px 20px' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 'var(--radius-md)', background: 'var(--color-green-dim)', border: '1px solid var(--color-green-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Shield size={15} style={{ color: 'var(--color-green)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 3 }}>Security Score: 94/100</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>Your workspace has excellent security posture. All critical checks passed.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workspace */}
          {activeSection === 'workspace' && (
            <div>
              <h2 className="text-page-title" style={{ fontSize: 20, marginBottom: 4 }}>Workspace</h2>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 28 }}>Configure your organization's Relay workspace</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Organization Name', value: 'Acme Corp' },
                  { label: 'Workspace URL', value: 'acme.relay.ai' },
                  { label: 'Timezone', value: 'America/New_York (UTC-5)' },
                  { label: 'Default Language', value: 'English (US)' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <label style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>{label}</label>
                    <input className="input" defaultValue={value} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <button className="btn btn-primary" onClick={handleSave}>
                  {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Appearance */}
          {activeSection === 'appearance' && (
            <div>
              <h2 className="text-page-title" style={{ fontSize: 20, marginBottom: 4 }}>Appearance</h2>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 28 }}>Customize the look and feel of Relay</p>
              <div className="glass-card" style={{ padding: '16px 20px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>Theme</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {[
                    { name: 'Dark', active: true,  bg: '#050811', border: 'var(--color-cyan)' },
                    { name: 'Light', active: false, bg: '#F9FAFB', border: 'var(--border-default)' },
                    { name: 'System', active: false, bg: 'linear-gradient(135deg, #050811 50%, #F9FAFB 50%)', border: 'var(--border-default)' },
                  ].map(({ name, active, bg, border }) => (
                    <button key={name} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                      background: 'transparent', border: 'none', cursor: 'pointer',
                    }}>
                      <div style={{
                        width: 80, height: 52, borderRadius: 'var(--radius-md)',
                        background: bg,
                        border: `2px solid ${active ? 'var(--color-cyan)' : 'var(--border-default)'}`,
                        boxShadow: active ? '0 0 0 3px rgba(34,211,238,0.15)' : 'none',
                      }} />
                      <span style={{ fontSize: 12.5, color: active ? 'var(--color-cyan)' : 'var(--text-secondary)', fontWeight: active ? 600 : 400 }}>{name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
