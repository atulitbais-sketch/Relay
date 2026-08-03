import { Clock3, CheckCircle2, Loader2 } from "lucide-react";

export default function StatusBadge({ status }) {
  const config = {
    Pending: {
      icon: Clock3,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.18)",
      label: "Pending",
    },
    InProgress: {
      icon: Loader2,
      color: "#22d3ee",
      bg: "rgba(34, 211, 238, 0.08)",
      border: "rgba(34, 211, 238, 0.18)",
      label: "In Progress",
    },
    Completed: {
      icon: CheckCircle2,
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.08)",
      border: "rgba(16, 185, 129, 0.18)",
      label: "Completed",
    },
  };

  const item = config[status] || config.Pending;
  const Icon = item.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
      style={{
        color: item.color,
        background: item.bg,
        border: `1px solid ${item.border}`,
      }}
    >
      <Icon
        size={11}
        className={status === "InProgress" || status === "processing" ? "animate-spin" : ""}
      />
      {item.label}
    </span>
  );
}
