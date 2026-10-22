"use client";

import { useState, type FormEvent } from "react";
import { sendAiChatMessage, type AiChatMessage } from "@/lib/api";
import { type BoardData } from "@/lib/kanban";

interface AiChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onBoardUpdate: (updatedBoard: BoardData) => void;
  username?: string;
}

export const AiChatSidebar = ({
  isOpen,
  onClose,
  onBoardUpdate,
  username = "user",
}: AiChatSidebarProps) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your AI project manager. I can help organize tasks, add or rename cards, or adjust stages on your board.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: AiChatMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const result = await sendAiChatMessage(
        userMessage.content,
        messages,
        username
      );

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.message },
      ]);

      if (result.boardUpdate) {
        onBoardUpdate(result.boardUpdate);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      aria-label="AI Project Assistant Sidebar"
      data-testid="ai-sidebar"
      className="fixed bottom-0 right-0 top-0 z-50 flex w-full flex-col border-l border-[var(--stroke)] bg-white/95 shadow-2xl backdrop-blur-md sm:w-[420px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--stroke)] px-6 py-5">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full bg-[var(--accent-yellow)]" />
          <h2 className="font-display text-lg font-semibold text-[var(--navy-dark)]">
            AI Assistant
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close assistant"
          className="rounded-full border border-[var(--stroke)] p-2 text-xs font-semibold text-[var(--gray-text)] transition hover:border-[var(--navy-dark)] hover:text-[var(--navy-dark)]"
        >
          ✕
        </button>
      </div>

      {/* Message list */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col gap-1.5 ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--gray-text)]">
              {msg.role === "user" ? "You" : "Assistant"}
            </span>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[var(--primary-blue)] text-white shadow-sm"
                  : "border border-[var(--stroke)] bg-[var(--surface)] text-[var(--navy-dark)]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[var(--gray-text)]">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--secondary-purple)] border-t-transparent" />
            <span>AI is updating the board...</span>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
          >
            {error}
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="border-t border-[var(--stroke)] p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI to add or organize cards..."
            disabled={loading}
            className="flex-1 rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--navy-dark)] outline-none transition focus:border-[var(--primary-blue)] focus:bg-white"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-2xl bg-[var(--secondary-purple)] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition hover:opacity-95 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </aside>
  );
};
