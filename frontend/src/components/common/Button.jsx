export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}) {
  const variants = {
    primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md hover:-translate-y-0.5",
    secondary: "bg-white/[0.03] text-slate-300 border border-white/5 hover:bg-white/[0.06] hover:text-white",
    success: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md hover:-translate-y-0.5",
    danger: "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md hover:-translate-y-0.5",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/[0.04]",
    outline: "bg-transparent text-cyan-400 border border-cyan-400/20 hover:bg-cyan-400/5 hover:-translate-y-0.5",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`shine inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
