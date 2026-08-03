import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/common/PageHeader";
import TaskCard from "../components/tasks/TaskCard";

import { tasks } from "../data/mockData";

export default function Tasks() {
  return (
    <MainLayout>
      <div className="space-y-8">
        
        <PageHeader
          title="AI Task Center"
          description="Actionable tasks automatically extracted from ingested documents, security regulations and policies."
        />

        {/* Task Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

      </div>
    </MainLayout>
  );
}
