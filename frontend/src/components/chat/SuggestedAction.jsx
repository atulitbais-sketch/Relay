import { Sparkles } from "lucide-react";

export default function SuggestedAction({ text, action }) {
  const label = text || action;
  return (
    <button
      className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-cyan-400 transition-all duration-200 hover:bg-cyan-400/[0.08]"
      style={{
        background: "rgba(34, 211, 238, 0.05)",
        border: "1px solid rgba(34, 211, 238, 0.15)",
      }}
    >
      <Sparkles size={11} className="animate-pulse" />
      {label}
    </button>
  );
}
