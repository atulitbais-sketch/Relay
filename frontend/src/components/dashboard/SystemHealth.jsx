import {
  ShieldCheck,
  Database,
  BrainCircuit,
  GitCompare,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SystemHealth() {
  const systems = [
    {
      label: "CockroachDB",
      status: "Healthy",
      color: "#10b981",
      icon: Database,
      accent: "#3b82f6",
    },
    {
      label: "Amazon Bedrock",
      status: "Healthy",
      color: "#10b981",
      icon: BrainCircuit,
      accent: "#8b5cf6",
    },
    {
      label: "Vector Search",
      status: "Operational",
      color: "#22d3ee",
      icon: ShieldCheck,
      accent: "#22d3ee",
    },
    {
      label: "Conflict Detection",
      status: "Running",
      color: "#f59e0b",
      icon: GitCompare,
      accent: "#f59e0b",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-7 flex flex-col justify-between"
      style={{
        background: "linear-gradient(135deg, #0D1B30, #111F38)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <ShieldCheck className="text-emerald-400" size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              System Health
            </h2>
            <p className="text-xs text-slate-500">
              Current platform service status
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {systems.map((system) => {
            const Icon = system.icon;

            return (
              <motion.div
                key={system.label}
                whileHover={{ x: 3 }}
                className="flex items-center justify-between rounded-2xl p-3.5 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${system.accent}15` }}
                  >
                    <Icon size={18} style={{ color: system.accent }} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {system.label}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Service Active
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ background: system.color }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{
                        background: system.color,
                        boxShadow: `0 0 8px ${system.color}`,
                      }}
                    />
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: system.color }}
                  >
                    {system.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div
        className="mt-6 rounded-2xl p-4 flex items-center justify-between"
        style={{
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.15)",
        }}
      >
        <span className="text-xs text-slate-400">All systems operating within normal parameters</span>
        <span className="text-xs font-bold text-emerald-400">99.98% Uptime</span>
      </div>
    </motion.div>
  );
}