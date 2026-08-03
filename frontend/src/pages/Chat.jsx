import MainLayout from "../components/layout/MainLayout";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";

const suggestions = [
  "Why was Vendor Alpha rejected?",
  "Show deployment policy conflicts",
  "Summarize Security Policy v3.1",
  "List pending compliance tasks",
];

export default function Chat() {
  return (
    <MainLayout>
      <div
        className="flex h-[calc(100vh-140px)] flex-col rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(14, 23, 38, 0.75) 0%, rgba(9, 16, 31, 0.85) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Suggested questions */}
        <div className="flex flex-wrap gap-2 px-6 py-4.5" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
          {suggestions.map((q) => (
            <button
              key={q}
              className="rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 transition-all duration-200 hover:text-white hover:bg-white/[0.04]"
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          <ChatMessage role="user" message="Why was Vendor Alpha rejected?" />

          <ChatMessage
            role="assistant"
            message="Vendor Alpha was rejected because it failed compliance requirements, violated the internal security policy, and required additional security documentation before approval."
            citations={[
              { document: "VendorReview.pdf", section: "Section 3 · Compliance" },
              { document: "SecurityPolicy.pdf", section: "Section 7 · Vendor Standards" },
            ]}
            actions={[
              "Create Security Review Task",
              "Open Vendor Agreement",
              "Show policy conflicts",
            ]}
          />
        </div>

        {/* Input */}
        <div className="px-6 py-5" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", background: "rgba(9, 16, 31, 0.3)" }}>
          <ChatInput />
        </div>
      </div>
    </MainLayout>
  );
}
