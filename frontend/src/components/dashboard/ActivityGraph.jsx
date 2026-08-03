import { Activity, Sparkles } from "lucide-react";

export default function ActivityGraph() {
  return (
    <div className="relay-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-tight">Memory Growth</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">Continuous AI indexing frequency</p>
        </div>
        <span className="rounded-xl px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          Last 7 Days
        </span>
      </div>

      <div className="relative h-[220px]">
        <svg viewBox="0 0 700 220" className="h-full w-full">
          <defs>
            <linearGradient id="graphStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <linearGradient id="graphFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[40, 80, 120, 160, 200].map((y) => (
            <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          ))}

          {/* Area under the curve */}
          <path
            d="M20 170 C80 160,120 130,170 140 S260 80,320 100 S420 120,470 90 S560 60,610 75 S650 45,680 30 L680 220 L20 220 Z"
            fill="url(#graphFill)"
          />

          {/* Main stroke line */}
          <path
            className="animate-draw"
            d="M20 170 C80 160,120 130,170 140 S260 80,320 100 S420 120,470 90 S560 60,610 75 S650 45,680 30"
            fill="none"
            stroke="url(#graphStroke)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Double-layered glowing data points */}
          {[[20,170],[170,140],[320,100],[470,90],[610,75],[680,30]].map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="8" fill="rgba(34, 211, 238, 0.15)" />
              <circle cx={x} cy={y} r="4" fill="#22d3ee" style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }} />
            </g>
          ))}

          {/* Labels */}
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((label, i) => {
            const xs = [20,130,240,350,460,570,680];
            return (
              <text key={label} x={xs[i]} y={215} textAnchor="middle" fontSize="10" fontWeight="700" fill="rgba(148,163,184,0.4)" style={{ letterSpacing: '0.05em' }}>{label}</text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
