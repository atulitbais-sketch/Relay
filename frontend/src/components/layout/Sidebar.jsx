import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  CheckSquare,
  AlertTriangle,
  Settings,
  BrainCircuit,
  Database,
  ChevronDown,
  Zap,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { motion } from "framer-motion";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard", color: "#22d3ee" },
  { title: "AI Chat",   icon: MessageSquare,   path: "/chat",       color: "#8b5cf6" },
  { title: "Documents", icon: FileText,        path: "/upload",     color: "#3b82f6" },
  { title: "Tasks",     icon: CheckSquare,     path: "/tasks",      color: "#10b981" },
  { title: "Conflicts", icon: AlertTriangle,   path: "/conflicts",  color: "#ef4444" },
  { title: "Settings",  icon: Settings,        path: "/settings",   color: "#f59e0b" },
];

export default function Sidebar() {
  return (
    <aside
      className="relative flex h-screen w-[250px] shrink-0 flex-col overflow-hidden"
      style={{
        background: "rgba(9, 16, 31, 0.85)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Decorative vertical border line */}
      <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-cyan-500/10 via-indigo-500/10 to-transparent" />

      {/* Logo Area */}
      <div className="px-6 py-6" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl"
               style={{
                 background: "linear-gradient(135deg, #22d3ee, #3b82f6, #6366f1)",
                 boxShadow: "0 0 15px rgba(34, 211, 238, 0.35)",
               }}>
            <BrainCircuit size={20} className="text-white" />
            <div className="absolute -inset-0.5 rounded-xl bg-cyan-400/20 blur-md animate-pulse-glow pointer-events-none" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Relay
            </h1>
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Enterprise AI</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1.5">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.path} to={item.path}>
                {({ isActive }) => (
                  <div
                    className={clsx(
                      "group flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                      isActive
                        ? "text-white"
                        : "text-slate-500 hover:bg-white/[0.03] hover:text-slate-300"
                    )}
                    style={isActive ? {
                      background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`,
                      border: `1px solid ${item.color}25`,
                      boxShadow: `0 0 15px ${item.color}06`,
                    } : {
                      border: "1px solid transparent",
                    }}
                  >
                    <Icon size={16} style={{ color: isActive ? item.color : undefined }} className={!isActive ? "text-slate-500 transition-colors group-hover:text-slate-300" : ""} />
                    <span>{item.title}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Memory Capacity */}
      <div className="px-4 pb-4">
        <div className="relay-card p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(34,211,238,0.08)" }}>
              <Database size={14} className="text-cyan-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-white uppercase tracking-wider">Memory Size</p>
              <p className="text-[10px] text-slate-500">2,451 / 5,000</p>
            </div>
            <span className="text-[11px] font-bold text-cyan-400">74%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "74%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #22d3ee, #6366f1)",
                boxShadow: "0 0 8px rgba(34, 211, 238, 0.4)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Profile Footer */}
      <div className="px-4 pb-5" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)" }}>
        <div className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-white/[0.03]">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
              boxShadow: "0 0 10px rgba(139, 92, 246, 0.25)",
            }}
          >
            S
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white">Sandesh</p>
            <p className="text-[10px] text-slate-500">Administrator</p>
          </div>
          <ChevronDown size={14} className="text-slate-600" />
        </div>
      </div>
    </aside>
  );
}
