import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend?.(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-3">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask Relay about documents, policies, tasks..."
        className="h-12 flex-1 rounded-xl px-4 text-xs font-semibold text-white placeholder:text-slate-500 outline-none transition-all duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "rgba(34, 211, 238, 0.35)";
          e.target.style.background = "rgba(34, 211, 238, 0.02)";
          e.target.style.boxShadow = "0 0 15px rgba(34, 211, 238, 0.05)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "rgba(255, 255, 255, 0.05)";
          e.target.style.background = "rgba(255, 255, 255, 0.02)";
          e.target.style.boxShadow = "none";
        }}
      />
      <button
        onClick={handleSend}
        className="shine flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
          boxShadow: "0 4px 15px rgba(139, 92, 246, 0.25)",
        }}
      >
        <SendHorizontal size={16} />
      </button>
    </div>
  );
}
