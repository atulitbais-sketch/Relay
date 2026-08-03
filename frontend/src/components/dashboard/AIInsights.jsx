import { Bot, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const findings = [
  "Vendor Alpha rejected — compliance failure detected",
  "4 memory conflicts need your review",
  "Security Policy v3.1 uploaded 2 minutes ago",
  "34 AI-generated tasks awaiting action",
];

export default function AIInsights() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col p-6 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.45) 0%, rgba(9, 15, 28, 0.65) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="flex items-center gap-3.5 pb-4" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "rgba(139, 92, 246, 0.08)",
            border: "1px solid rgba(139, 92, 246, 0.18)",
          }}
        >
          <Bot size={20} className="text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
            AI Assistant
          </h2>
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Latest Findings</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-400/5 border border-cyan-400/10">
          <Sparkles size={9} />
          Bedrock
        </span>
      </div>

      <div className="mt-5 flex-1 space-y-2.5">
        {findings.map((item, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.01]"
            style={{
              background: "rgba(255, 255, 255, 0.01)",
              border: "1px solid rgba(255, 255, 255, 0.03)",
            }}
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 6px #22d3ee" }} />
            <span className="text-xs font-semibold leading-relaxed text-slate-300">{item}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/chat")}
        className="btn-primary mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white"
      >
        Ask Relay anything
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
