export default function SeverityBadge({ severity }) {
  const styles = {
    High: {
      color: "#ef4444",
      bg: "rgba(239, 68, 68, 0.08)",
      border: "rgba(239, 68, 68, 0.18)",
    },
    Medium: {
      color: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.08)",
      border: "rgba(245, 158, 11, 0.18)",
    },
    Low: {
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.08)",
      border: "rgba(16, 185, 129, 0.18)",
    },
  };

  const item = styles[severity] || styles.Medium;

  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
      style={{
        color: item.color,
        background: item.bg,
        border: `1px solid ${item.border}`,
      }}
    >
      {severity} Severity
    </span>
  );
}
