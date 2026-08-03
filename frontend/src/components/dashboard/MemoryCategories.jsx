const categories = [
  { label: "Security",     value: 28, color: "#3b82f6" },
  { label: "Compliance",   value: 22, color: "#8b5cf6" },
  { label: "Architecture", value: 18, color: "#22d3ee" },
  { label: "Procurement",  value: 15, color: "#10b981" },
  { label: "HR Policy",    value: 10, color: "#f59e0b" },
  { label: "Other",        value: 7,  color: "#64748b" },
];

export default function MemoryCategories() {
  const total = categories.reduce((s, c) => s + c.value, 0);
  let offset = 0;
  const segments = categories.map((c) => {
    const pct = (c.value / total) * 100;
    const seg = { ...c, pct, offset };
    offset += pct;
    return seg;
  });

  const gradientStops = segments
    .map((s) => `${s.color} ${s.offset}% ${s.offset + s.pct}%`)
    .join(", ");

  return (
    <div className="relay-card p-6">
      <div className="mb-6">
        <h2 className="text-base font-bold text-white tracking-tight">Top Memory Categories</h2>
        <p className="mt-1 text-xs text-slate-500">Distribution across knowledge base</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8 justify-around">
        <div className="relative shrink-0 flex items-center justify-center">
          <div
            className="h-36 w-36 rounded-full"
            style={{
              background: `conic-gradient(${gradientStops})`,
              boxShadow: "0 0 35px rgba(34, 211, 238, 0.12)",
            }}
          />
          <div
            className="absolute inset-0 m-auto flex h-24 w-24 flex-col items-center justify-center rounded-full"
            style={{ background: "rgba(14,23,38,1)", border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <span className="text-xl font-extrabold text-white">2,451</span>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-0.5">Total</span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-2.5">
          {categories.map((c) => (
            <div key={c.label} className="flex items-center justify-between gap-4 rounded-lg p-1.5 px-3 transition hover:bg-white/[0.01]"
                 style={{ border: "1px solid rgba(255,255,255,0.01)" }}>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ background: c.color, boxShadow: `0 0 8px ${c.color}` }} />
                <span className="text-xs font-semibold text-slate-400">{c.label}</span>
              </div>
              <span className="text-xs font-bold text-white">{c.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
