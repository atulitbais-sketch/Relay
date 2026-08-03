export default function Card({ children, className = "", hover = true, padding = true, style = {} }) {
  return (
    <div
      className={`glass-panel ${hover ? "glass-panel-hover" : ""} ${padding ? "p-6" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
