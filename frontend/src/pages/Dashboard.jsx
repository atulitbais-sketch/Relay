import MainLayout from "../components/layout/MainLayout";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import AIInsights from "../components/dashboard/AIInsights";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import ActivityGraph from "../components/dashboard/ActivityGraph";
import MemoryCategories from "../components/dashboard/MemoryCategories";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <DashboardHero />
        <DashboardStats />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] items-stretch">
          <AIInsights />
          <ActivityTimeline />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 items-stretch">
          <ActivityGraph />
          <MemoryCategories />
        </div>
      </div>
    </MainLayout>
  );
}
