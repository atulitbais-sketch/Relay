import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import AIChat from './pages/AIChat'
import Documents from './pages/Documents'
import Tasks from './pages/Tasks'
import MemoryConflicts from './pages/MemoryConflicts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<AIChat />} />
          <Route path="documents" element={<Documents />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="conflicts" element={<MemoryConflicts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
