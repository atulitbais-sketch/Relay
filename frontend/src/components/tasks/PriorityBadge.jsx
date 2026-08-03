import { AlertTriangle, Minus, ArrowUp } from "lucide-react";

export default function PriorityBadge({ priority }) {
  const config = {
    High: {
      icon: AlertTriangle,
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.08)",
      border: "rgba(239, 68, 68, 0.18)",
    },
    Medium: {
      icon: ArrowUp,
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.18)",
    },
    Low: {
      icon: Minus,
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.08)",
      border: "rgba(16, 185, 129, 0.18)",
    },
  };

  const item = config[priority] || config.Low;
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
      <Icon size={11} />
      {priority}
    </span>
  );
}
