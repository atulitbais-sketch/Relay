import MainLayout from "../components/layout/MainLayout";
import PageHeader from "../components/common/PageHeader";
import ConflictCard from "../components/conflicts/ConflictCard";

import { conflicts } from "../data/mockData";

export default function Conflicts() {
  return (
    <MainLayout>
      <div className="space-y-8">
        
        <PageHeader
          title="Memory Conflicts"
          description="Relay automatically identifies contradictions or policy differences between existing memories and new uploaded document data."
        />

        {/* Conflicts List */}
        <div className="space-y-6">
          {conflicts.map((conflict) => (
            <ConflictCard key={conflict.id} conflict={conflict} />
          ))}
        </div>

      </div>
    </MainLayout>
  );
}
