export default function SettingCard({ title, description, children }) {
  return (
    <div className="relay-card p-5">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
