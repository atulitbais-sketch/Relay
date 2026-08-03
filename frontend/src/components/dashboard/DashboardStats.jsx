import { FileText, BrainCircuit, CheckSquare, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { title: "Documents", value: "148",  change: "+12 today",     icon: FileText,      accent: "#3b82f6", bg: "rgba(59,130,246,0.08)" },
  { title: "Memories",  value: "2,451", change: "+54 today",    icon: BrainCircuit,  accent: "#8b5cf6", bg: "rgba(139,92,246,0.08)" },
  { title: "Tasks",     value: "34",   change: "5 pending",     icon: CheckSquare,   accent: "#10b981", bg: "rgba(16,185,129,0.08)" },
  { title: "Conflicts", value: "4",    change: "Needs review",  icon: AlertTriangle, accent: "#ef4444", bg: "rgba(239,68,68,0.08)" },
];

export default function DashboardStats() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-2xl p-5"
            style={{
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.4) 0%, rgba(9, 15, 28, 0.6) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Top Glow Accent bar */}
            <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: item.accent, opacity: 0.6 }} />

            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.title}</p>
                <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-white">{item.value}</p>
                <p className="mt-1 text-[11px] font-bold" style={{ color: item.accent }}>
                  {item.change}
                </p>
              </div>

              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition duration-300"
                style={{
                  background: item.bg,
                  border: `1px solid ${item.accent}20`,
                }}
              >
                <Icon size={18} style={{ color: item.accent }} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
