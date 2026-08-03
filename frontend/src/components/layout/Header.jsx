import { Bell, Search, ChevronDown, Command, Activity } from "lucide-react";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-40 flex h-18 shrink-0 items-center justify-between px-8"
      style={{
        background: "rgba(9,16,31,0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Search Input */}
      <div className="relative w-full max-w-[380px]">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          placeholder="Search memories, tasks, documents..."
          className="h-10 w-full rounded-xl pl-10 pr-12 text-xs text-white placeholder:text-slate-500 outline-none transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(34, 211, 238, 0.35)";
            e.target.style.background = "rgba(34, 211, 238, 0.03)";
            e.target.style.boxShadow = "0 0 15px rgba(34, 211, 238, 0.08)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255, 255, 255, 0.06)";
            e.target.style.background = "rgba(255, 255, 255, 0.03)";
            e.target.style.boxShadow = "none";
          }}
        />
        <div
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] text-slate-500"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Command size={9} />
          <span>K</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Connection status */}
        <div className="hidden items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold text-emerald-400 lg:flex"
             style={{
               background: "rgba(16, 185, 129, 0.06)",
               border: "1px solid rgba(16, 185, 129, 0.15)",
             }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Active
        </div>

        {/* Notifications */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/[0.04]"
          style={{ border: "1px solid rgba(255, 255, 255, 0.06)", background: "rgba(255, 255, 255, 0.02)" }}
        >
          <Bell size={16} className="text-slate-400" />
          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 8px #22d3ee" }} />
        </button>

        {/* User Profile */}
        <button
          className="flex items-center gap-3 rounded-xl px-3 py-1.5 transition-all duration-200 hover:bg-white/[0.04]"
          style={{ border: "1px solid rgba(255, 255, 255, 0.06)", background: "rgba(255, 255, 255, 0.02)" }}
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
              boxShadow: "0 0 10px rgba(34, 211, 238, 0.25)",
            }}
          >
            S
          </div>
          <div className="hidden text-left md:block">
            <p className="text-xs font-bold text-white">Sandesh</p>
            <p className="text-[10px] text-slate-500">Administrator</p>
          </div>
          <ChevronDown size={13} className="text-slate-600" />
        </button>
      </div>
    </header>
  );
}
