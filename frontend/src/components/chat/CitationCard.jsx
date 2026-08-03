import { FileText } from "lucide-react";

export default function CitationCard({ document, section }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-xs transition hover:bg-white/[0.04] cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <FileText size={14} className="shrink-0 text-cyan-400" />
      <div className="min-w-0">
        <span className="font-semibold text-slate-300 block truncate">{document}</span>
        {section && <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{section}</span>}
      </div>
    </div>
  );
}
