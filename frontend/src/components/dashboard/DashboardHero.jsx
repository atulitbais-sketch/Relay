import { Sparkles } from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardHero() {
  return (
    <div className="animate-fade-up relative overflow-hidden rounded-3xl p-6 md:p-8"
         style={{
           background: "linear-gradient(135deg, rgba(14,23,38,0.4) 0%, rgba(9,16,31,0.6) 100%)",
           border: "1px solid rgba(255,255,255,0.05)",
           boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
         }}>
      <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-cyan-500/5 blur-[60px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400"
               style={{ background: "rgba(34, 211, 238, 0.08)", border: "1px solid rgba(34, 211, 238, 0.15)" }}>
            <Sparkles size={11} className="animate-pulse" />
            AI Enterprise Platform
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {getGreeting()}, Sandesh 👋
          </h1>
          <p className="mt-1.5 text-xs text-slate-400">
            Here's what's happening in your enterprise memory workspace today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-xl font-extrabold text-white">99.8%</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">Confidence Rate</p>
          </div>
          <div className="rounded-2xl px-5 py-3 text-center" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-xl font-extrabold text-cyan-400">Active</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">System Status</p>
          </div>
        </div>
      </div>
    </div>
  );
}
