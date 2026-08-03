import { UploadCloud, FileUp } from "lucide-react";
import { motion } from "framer-motion";

export default function UploadDropzone() {
  return (
    <div
      className="group cursor-pointer rounded-3xl p-10 text-center transition-all duration-300 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(14,23,38,0.4) 0%, rgba(9,16,31,0.6) 100%)",
        border: "1px dashed rgba(34, 211, 238, 0.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.6)";
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(14,23,38,0.6) 0%, rgba(34,211,238,0.04) 100%)";
        e.currentTarget.style.boxShadow = "0 0 30px rgba(34, 211, 238, 0.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.25)";
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(14,23,38,0.4) 0%, rgba(9,16,31,0.6) 100%)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-blue-500/5 blur-[60px] pointer-events-none" />

      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110"
        style={{
          background: "rgba(34, 211, 238, 0.08)",
          border: "1px solid rgba(34, 211, 238, 0.2)",
          boxShadow: "0 4px 15px rgba(34, 211, 238, 0.15)",
        }}
      >
        <UploadCloud size={30} className="text-cyan-400" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-white tracking-tight">Drag & drop files here</h3>
      <p className="mt-1.5 text-xs text-slate-500 font-medium">PDF, DOCX, TXT — max 50 MB</p>
      
      <button
        className="shine mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
          boxShadow: "0 0 15px rgba(34, 211, 238, 0.25)",
        }}
      >
        <FileUp size={14} />
        Browse Files
      </button>
    </div>
  );
}
