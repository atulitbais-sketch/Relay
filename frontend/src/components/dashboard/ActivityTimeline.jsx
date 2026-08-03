const timeline = [
  { color: "#3b82f6", title: "SecurityPolicy.docx uploaded",  time: "2m ago" },
  { color: "#8b5cf6", title: "Policy conflict detected",     time: "8m ago" },
  { color: "#10b981", title: "Security task auto-created",    time: "15m ago" },
  { color: "#f59e0b", title: "Architecture memory updated",   time: "31m ago" },
  { color: "#22d3ee", title: "VendorReview.pdf processed",    time: "1h ago" },
];

export default function ActivityTimeline() {
  return (
    <div
      className="flex flex-col p-6 rounded-3xl"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.45) 0%, rgba(9, 15, 28, 0.65) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Activity Timeline</h2>
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">Recent workspace events</p>
      </div>

      <div className="flex-1 space-y-0.5">
        {timeline.map((item, i) => (
          <div key={item.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className="relative h-3 w-3 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                }}
              >
                <div className="absolute h-1.5 w-1.5 rounded-full bg-slate-900" />
              </div>
              {i < timeline.length - 1 && (
                <div className="w-0.5 flex-1 bg-white/[0.04]" style={{ minHeight: "36px" }} />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div
                className="flex items-center justify-between gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-white/[0.01]"
                style={{
                  background: "rgba(255, 255, 255, 0.01)",
                  border: "1px solid rgba(255, 255, 255, 0.03)",
                }}
              >
                <span className="text-xs font-semibold text-slate-300 truncate">{item.title}</span>
                <span className="shrink-0 text-[10px] font-bold text-slate-500">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
