import { motion } from "framer-motion";
import {
  FileText,
  Clock3,
  CheckCircle2,
  BrainCircuit,
  ArrowRight,
  Loader2,
} from "lucide-react";

const documents = [
  {
    name: "Vendor_Agreement.pdf",
    memories: 24,
    status: "Processed",
    time: "2 min ago",
  },
  {
    name: "Security_Policy.docx",
    memories: 41,
    status: "Processed",
    time: "18 min ago",
  },
  {
    name: "Architecture_Guide.pdf",
    memories: 33,
    status: "Processing",
    time: "36 min ago",
  },
  {
    name: "Employee_Handbook.pdf",
    memories: 18,
    status: "Processed",
    time: "1 hour ago",
  },
];

export default function DocumentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl p-7"
      style={{
        background: "linear-gradient(135deg, #0D1B30, #111F38)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Recent Documents
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest enterprise documents processed by Relay
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, x: 2 }}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-slate-300 transition"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          View All
          <ArrowRight size={14} />
        </motion.button>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => {
          const isProcessing = doc.status === "Processing";
          return (
            <motion.div
              key={doc.name}
              whileHover={{ x: 3 }}
              className="flex items-center justify-between rounded-2xl p-4 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(59,130,246,0.12)",
                    border: "1px solid rgba(59,130,246,0.2)",
                  }}
                >
                  <FileText size={20} className="text-blue-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-white">
                    {doc.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <BrainCircuit size={13} className="text-violet-400" />
                      {doc.memories} memories
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock3 size={13} />
                      {doc.time}
                    </div>
                  </div>
                </div>
              </div>

              {isProcessing ? (
                <div
                  className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-amber-400"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.2)",
                  }}
                >
                  <Loader2 size={13} className="animate-spin" />
                  Processing
                </div>
              ) : (
                <div
                  className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-emerald-400"
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                  }}
                >
                  <CheckCircle2 size={13} />
                  Processed
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}