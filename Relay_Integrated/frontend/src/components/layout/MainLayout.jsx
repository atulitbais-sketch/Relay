import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

function MainLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1 }}>
        <Header />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
