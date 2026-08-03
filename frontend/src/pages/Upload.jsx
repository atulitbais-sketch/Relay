import MainLayout from "../components/layout/MainLayout";
import UploadDropzone from "../components/upload/UploadDropzone";
import PageHeader from "../components/common/PageHeader";
import Card from "../components/common/Card";
import { recentDocuments } from "../data/mockData";
import { FileText, CheckCircle2, Loader2, Check } from "lucide-react";

const uploadProgress = [
  { name: "SecurityPolicy.docx", progress: 48 },
  { name: "VendorReview.pdf", progress: 100 },
];

const extractionSteps = [
  { label: "Reading document", done: true },
  { label: "Extracting memories", done: true },
  { label: "Identifying key decisions", done: false },
  { label: "Running conflict detection", done: false },
];

export default function Upload() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <PageHeader
          title="Documents"
          description="Upload enterprise documents for AI processing and memory extraction."
        />

        <UploadDropzone />

        {/* Upload progress + extraction */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card hover={false} className="p-6">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Upload Progress</h3>
            <div className="space-y-5">
              {uploadProgress.map((file) => (
                <div key={file.name}>
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-300">{file.name}</span>
                    <span className="text-slate-500">{file.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${file.progress}%`,
                        background: file.progress === 100
                          ? "linear-gradient(90deg, #10b981, #059669)"
                          : "linear-gradient(90deg, #22d3ee, #3b82f6)",
                        boxShadow: file.progress === 100 
                          ? "0 0 8px rgba(16, 185, 129, 0.4)"
                          : "0 0 8px rgba(34, 211, 238, 0.4)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card hover={false} className="p-6">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Extracting Memories</h3>
            <div className="space-y-3.5">
              {extractionSteps.map((step) => (
                <div key={step.label} className="flex items-center gap-3.5 rounded-xl p-2 px-3 transition hover:bg-white/[0.01]"
                     style={{ border: "1px solid rgba(255,255,255,0.01)" }}>
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: step.done ? "rgba(16,185,129,0.1)" : "rgba(34, 211, 238, 0.08)",
                      border: step.done ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(34, 211, 238, 0.2)",
                    }}
                  >
                    {step.done ? (
                      <Check size={12} className="text-emerald-400" />
                    ) : (
                      <Loader2 size={12} className="animate-spin text-cyan-400" />
                    )}
                  </div>
                  <span className={`text-xs font-semibold ${step.done ? "text-slate-300" : "text-slate-500"}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent uploads table */}
        <Card hover={false} className="overflow-hidden p-0">
          <div className="px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Uploads</h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between px-6 py-4.5 transition hover:bg-white/[0.01]"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(34, 211, 238, 0.08)",
                      border: "1px solid rgba(34, 211, 238, 0.15)",
                    }}
                  >
                    <FileText size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white tracking-tight">{doc.name}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{doc.uploadedBy} · {doc.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-cyan-400 mr-2 bg-cyan-400/5 px-2.5 py-1 rounded-lg border border-cyan-400/10">
                    {doc.memories} memories
                  </span>
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                      doc.status === "Processed" ? "badge-green" : "badge-orange"
                    }`}
                  >
                    {doc.status === "Processed" ? <CheckCircle2 size={13} /> : <Loader2 size={13} className="animate-spin" />}
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
