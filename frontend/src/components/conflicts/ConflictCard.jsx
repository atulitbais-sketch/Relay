import Card from "../common/Card";
import Button from "../common/Button";
import SeverityBadge from "./SeverityBadge";
import { History, Sparkles } from "lucide-react";

export default function ConflictCard({ conflict }) {
  return (
    <Card hover={false} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">Memory Conflict</h2>
          <p className="mt-1 text-xs text-slate-500">Review before updating enterprise memory</p>
        </div>
        <SeverityBadge severity={conflict.severity} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div
          className="rounded-2xl p-5 transition-all duration-200 hover:bg-amber-500/[0.01]"
          style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.12)" }}
        >
          <div className="mb-3.5 flex items-center gap-2">
            <History size={16} className="text-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Existing Memory</h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{conflict.oldDecision}</p>
        </div>

        <div
          className="rounded-2xl p-5 transition-all duration-200 hover:bg-cyan-500/[0.01]"
          style={{ background: "rgba(34,211,238,0.04)", border: "1px solid rgba(34,211,238,0.12)" }}
        >
          <div className="mb-3.5 flex items-center gap-2">
            <Sparkles size={16} className="text-cyan-400 animate-pulse-soft" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">New Memory</h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">{conflict.newDecision}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <Button variant="secondary">Keep Existing</Button>
        <Button variant="success">Accept New</Button>
        <Button variant="outline">Merge Memories</Button>
      </div>
    </Card>
  );
}
