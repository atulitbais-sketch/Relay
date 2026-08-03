import CitationCard from "./CitationCard";
import SuggestedAction from "./SuggestedAction";
import { Bot, User, Sparkles } from "lucide-react";

export default function ChatMessage({
  role,
  message,
  citations = [],
  actions = [],
}) {
  const isBot = role === "assistant";

  return (
    <div className={`flex gap-3.5 ${isBot ? "justify-start" : "justify-end"}`}>
      {/* Bot/User Avatar */}
      {isBot && (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #3b82f6)",
            boxShadow: "0 0 10px rgba(34, 211, 238, 0.2)",
          }}
        >
          <Bot size={18} className="text-white" />
        </div>
      )}

      <div className={`max-w-[70%] ${isBot ? "" : "text-right"}`}>
        <div
          className="rounded-2xl px-5 py-3.5 text-xs font-semibold leading-relaxed tracking-wide"
          style={
            isBot
              ? {
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  color: "#e2e8f0",
                }
              : {
                  background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                  boxShadow: "0 4px 15px rgba(139, 92, 246, 0.2)",
                  color: "white",
                }
          }
        >
          {message}
        </div>

        {citations.length > 0 && (
          <div className="mt-4 text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Sources</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {citations.map((item, i) => (
                <CitationCard key={i} {...item} />
              ))}
            </div>
          </div>
        )}

        {actions.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2.5 justify-start">
            {actions.map((action) => (
              <SuggestedAction key={action} text={action} />
            ))}
          </div>
        )}
      </div>

      {!isBot && (
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <User size={18} className="text-slate-400" />
        </div>
      )}
    </div>
  );
}
