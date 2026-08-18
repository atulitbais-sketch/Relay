import DashboardHero from '../components/dashboard/DashboardHero'
import DashboardStats from '../components/dashboard/DashboardStats'
import AIInsights from '../components/dashboard/AIInsights'
import ActivityTimeline from '../components/dashboard/ActivityTimeline'
import ActivityGraph from '../components/dashboard/ActivityGraph'
import MemoryCategories from '../components/dashboard/MemoryCategories'

function Dashboard() {
  return (
    <div className="page-content section-gap" style={{ padding: '28px 32px' }}>
      {/* Hero */}
      <DashboardHero />

      {/* Stats Row */}
      <DashboardStats />

      {/* Activity Graph — full width */}
      <ActivityGraph />

      {/* Bottom Row — Insights | Timeline | Memory */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <AIInsights />
        <ActivityTimeline />
        <MemoryCategories />
      </div>
    </div>
  )
}

export default Dashboard
