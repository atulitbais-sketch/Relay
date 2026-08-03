import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, CheckSquare } from "lucide-react";

import Card from "../common/Card";
import Button from "../common/Button";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TaskCard({ task }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <Card hover={false} className="group relative overflow-hidden rounded-3xl p-6">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-1 gap-3.5">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "rgba(34,211,238,0.08)",
                border: "1px solid rgba(34,211,238,0.18)",
              }}
            >
              <CheckSquare size={18} className="text-cyan-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-base font-bold text-white tracking-tight leading-tight">
                  {task.title}
                </h3>
                <PriorityBadge priority={task.priority} />
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                {task.description}
              </p>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
          <div
            className="rounded-2xl p-4 transition-all duration-200 hover:bg-white/[0.01]"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <User size={13} />
              Owner
            </div>
            <h4 className="mt-1.5 text-xs font-semibold text-slate-300">
              {task.owner}
            </h4>
          </div>

          <div
            className="rounded-2xl p-4 transition-all duration-200 hover:bg-white/[0.01]"
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <Calendar size={13} />
              Due Date
            </div>
            <h4 className="mt-1.5 text-xs font-semibold text-slate-300">
              {task.dueDate}
            </h4>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <StatusBadge status={task.status} />

          <Button variant="primary" className="flex items-center gap-1.5 rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
            View Task
            <ArrowRight size={12} />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}