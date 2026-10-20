"use client";

import React, { useState, useRef, useEffect } from "react";
import { BotIcon, SendIcon, XIcon, SparklesIcon } from "./Icons";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am TwinMe, the AI Digital Twin of Shivam Saxena powered by Nemotron 3.5 Super VL. Ask me anything about Shivam's frontend architecture, experience at HCLSoftware and QuEST Global, tech stack, or how to collaborate!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    const updatedMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (response.ok && data.content) {
        setMessages([...updatedMessages, { role: "assistant", content: data.content }]);
      } else {
        setMessages([
          ...updatedMessages,
          {
            role: "assistant",
            content: `⚠️ ${data.error || "Sorry, I could not connect to Nemotron at this moment."}`,
          },
        ]);
      }
    } catch (err: any) {
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "⚠️ Network error connecting to TwinMe. Please verify your connection.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "linear-gradient(135deg, #00f0ff 0%, #8b5cf6 100%)",
            color: "#030712",
            border: "none",
            borderRadius: "9999px",
            fontWeight: 800,
            fontSize: "0.92rem",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(0, 240, 255, 0.45)",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.02em",
          }}
          className="floating"
          aria-label="Open TwinMe AI Chat"
        >
          <BotIcon style={{ color: "#030712" }} />
          <span>Talk to TwinMe</span>
          <span
            style={{
              fontSize: "0.68rem",
              background: "rgba(3, 7, 18, 0.25)",
              padding: "2px 8px",
              borderRadius: "999px",
              fontWeight: 700,
            }}
          >
            NEMOTRON 3.5
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "28px",
            right: "28px",
            width: "390px",
            maxWidth: "calc(100vw - 36px)",
            height: "560px",
            maxHeight: "calc(100vh - 56px)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            background: "rgba(10, 15, 29, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 240, 255, 0.3)",
            borderRadius: "20px",
            boxShadow: "0 20px 60px -10px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 240, 255, 0.2)",
            overflow: "hidden",
            animation: "float 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(15, 23, 42, 0.8)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #00f0ff 0%, #8b5cf6 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#030712",
                }}
              >
                <BotIcon style={{ color: "#030712" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <h3 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#f8fafc", letterSpacing: "-0.01em" }}>
                    TwinMe
                  </h3>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "#10b981",
                      fontFamily: "var(--font-mono)",
                      background: "rgba(16, 185, 129, 0.12)",
                      padding: "2px 6px",
                      borderRadius: "6px",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                    }}
                  >
                    ONLINE
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  NVIDIA Nemotron 3.5 Super VL
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                width: "30px",
                height: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-muted)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              aria-label="Close Chat"
            >
              <XIcon />
            </button>
          </div>

          {/* Quick Prompts */}
          <div
            style={{
              padding: "10px 16px",
              background: "rgba(0, 0, 0, 0.25)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <button
              onClick={() => {
                setInput("What is Shivam's core frontend stack?");
              }}
              style={{
                padding: "4px 10px",
                background: "rgba(0, 240, 255, 0.08)",
                border: "1px solid rgba(0, 240, 255, 0.2)",
                borderRadius: "999px",
                color: "#00f0ff",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
              }}
            >
              Core Stack?
            </button>
            <button
              onClick={() => {
                setInput("Tell me about Shivam's work at HCLSoftware.");
              }}
              style={{
                padding: "4px 10px",
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: "999px",
                color: "#8b5cf6",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
              }}
            >
              HCLSoftware role?
            </button>
            <button
              onClick={() => {
                setInput("How can I hire or contact Shivam?");
              }}
              style={{
                padding: "4px 10px",
                background: "rgba(16, 185, 129, 0.08)",
                border: "1px solid rgba(16, 185, 129, 0.2)",
                borderRadius: "999px",
                color: "#10b981",
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
              }}
            >
              How to reach?
            </button>
          </div>

          {/* Messages Container */}
          <div
            style={{
              flex: 1,
              padding: "16px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-subtle)",
                    fontFamily: "var(--font-mono)",
                    marginBottom: "4px",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                  }}
                >
                  {msg.role === "user" ? "YOU" : "TWINME // SHIVAM AI"}
                </div>
                <div
                  style={{
                    maxWidth: "88%",
                    padding: "12px 14px",
                    borderRadius: "14px",
                    fontSize: "0.88rem",
                    lineHeight: 1.55,
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)"
                        : "rgba(255, 255, 255, 0.05)",
                    color: msg.role === "user" ? "#030712" : "#f1f5f9",
                    fontWeight: msg.role === "user" ? 600 : 400,
                    border: msg.role === "user" ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                    borderBottomRightRadius: msg.role === "user" ? "4px" : "14px",
                    borderBottomLeftRadius: msg.role === "assistant" ? "4px" : "14px",
                    boxShadow:
                      msg.role === "user" ? "0 4px 16px rgba(0, 240, 255, 0.25)" : "none",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <div
                  style={{
                    padding: "12px 18px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(0, 240, 255, 0.25)",
                    borderBottomLeftRadius: "4px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            style={{
              padding: "14px 16px",
              background: "rgba(15, 23, 42, 0.9)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask TwinMe anything about Shivam..."
              disabled={isLoading}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "rgba(0, 0, 0, 0.4)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "10px",
                color: "#f8fafc",
                fontSize: "0.88rem",
                outline: "none",
                fontFamily: "var(--font-sans)",
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: input.trim() && !isLoading
                  ? "linear-gradient(135deg, #00f0ff 0%, #8b5cf6 100%)"
                  : "rgba(255, 255, 255, 0.06)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                color: input.trim() && !isLoading ? "#030712" : "var(--text-subtle)",
                transition: "all 0.2s",
              }}
              aria-label="Send Message"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
