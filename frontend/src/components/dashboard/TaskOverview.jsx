import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
  User,
  ArrowRight,
} from "lucide-react";

const tasks = [
  {
    title: "Review Vendor Agreement",
    priority: "High",
    owner: "Legal Team",
    due: "Today",
    color: "#ef4444",
  },
  {
    title: "Validate Security Policy",
    priority: "Medium",
    owner: "Security",
    due: "Tomorrow",
    color: "#f59e0b",
  },
  {
    title: "Approve Employee Handbook",
    priority: "Low",
    owner: "HR",
    due: "Aug 6",
    color: "#10b981",
  },
  {
    title: "Resolve Compliance Conflict",
    priority: "Critical",
    owner: "Compliance",
    due: "Today",
    color: "#8b5cf6",
  },
];

export default function TaskOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-7"
      style={{
        background: "linear-gradient(135deg, #0D1B30, #111F38)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            AI Task Center
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Tasks automatically generated from enterprise knowledge.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-slate-300 transition"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          View Tasks
          <ArrowRight size={14} />
        </motion.button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <motion.div
            key={task.title}
            whileHover={{ x: 3 }}
            className="rounded-2xl p-4 transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderLeft: `4px solid ${task.color}`,
            }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-sm text-white">
                  {task.title}
                </h3>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <div
                    className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    style={{
                      background: `${task.color}15`,
                      color: task.color,
                      border: `1px solid ${task.color}30`,
                    }}
                  >
                    <AlertTriangle size={11} />
                    {task.priority}
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-400">
                    <User size={11} />
                    {task.owner}
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-400">
                    <Clock3 size={11} />
                    {task.due}
                  </div>
                </div>
              </div>

              <CheckCircle2
                size={18}
                className="text-emerald-400 shrink-0 mt-0.5"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div
          className="rounded-2xl p-3 text-center"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xl font-bold text-white">34</p>
          <p className="mt-0.5 text-[11px] text-slate-500">Total Tasks</p>
        </div>

        <div
          className="rounded-2xl p-3 text-center"
          style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)" }}
        >
          <p className="text-xl font-bold text-amber-400">5</p>
          <p className="mt-0.5 text-[11px] text-slate-500">Pending</p>
        </div>

        <div
          className="rounded-2xl p-3 text-center"
          style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)" }}
        >
          <p className="text-xl font-bold text-emerald-400">29</p>
          <p className="mt-0.5 text-[11px] text-slate-500">Completed</p>
        </div>
      </div>
    </motion.div>
  );
}