import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bot, Send, KeyRound, Trash2 } from "lucide-react";

const API = (process.env.REACT_APP_BACKEND_URL || "") + "/api";
const KEY_STORAGE = "doodledesk.gemini.key";

export default function ChatPanel({ sessionId, tasks, panicIndex, bpm, stress }) {
  const [messages, setMessages] = useState([
    { id: "intro", role: "assistant", content: "Hi! I'm Doodle, your productivity coach. Tell me what's on your plate and I'll help you survive it. Ask me to prioritize, plan, or just vent." },
  ]);
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(KEY_STORAGE) || "");
  const [showKey, setShowKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  // Load past history once
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/chat/history/${sessionId}`);
        if (data?.messages?.length) {
          setMessages([
            { id: "intro", role: "assistant", content: "Welcome back! Here's where we left off." },
            ...data.messages.map((m) => ({ id: m.id, role: m.role, content: m.content })),
          ]);
        }
      } catch (e) {
        // ignore
      }
    })();
  }, [sessionId]);

  function saveKey(v) {
    setApiKey(v);
    if (v) localStorage.setItem(KEY_STORAGE, v);
    else localStorage.removeItem(KEY_STORAGE);
  }

  async function send(e) {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg = { id: Math.random().toString(36).slice(2), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    setStreaming("");

    try {
      const resp = await fetch(`${API}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          message: text,
          user_api_key: apiKey || null,
          provider: "gemini",
          model: "gemini-3-flash-preview",
          context: {
            tasks: tasks.slice(0, 12),
            panic_index: panicIndex,
            bpm,
            stress,
          },
        }),
      });

      if (!resp.ok || !resp.body) {
        const errTxt = await resp.text().catch(() => "");
        throw new Error(errTxt || "Chat failed");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const payload = line.slice(6).trim();
          if (payload === "[DONE]") continue;
          try {
            const parsed = JSON.parse(payload);
            if (parsed.delta) {
              acc += parsed.delta;
              setStreaming(acc);
            } else if (parsed.error) {
              acc += `\n\n⚠️ ${parsed.error}`;
              setStreaming(acc);
            }
          } catch {/* ignore */}
        }
      }
      setMessages((m) => [...m, { id: Math.random().toString(36).slice(2), role: "assistant", content: acc || "(empty)" }]);
      setStreaming("");
    } catch (err) {
      setMessages((m) => [...m, { id: "err"+Date.now(), role: "system", content: `Chat error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  async function clearChat() {
    try {
      await axios.delete(`${API}/chat/history/${sessionId}`);
    } catch {/* ignore */}
    setMessages([
      { id: "intro", role: "assistant", content: "Fresh notebook! What's the first thing on your mind?" },
    ]);
  }

  return (
    <div className="chat-panel" data-testid="chat-panel">
      <div className="chat-header">
        <span className="dot" />
        <Bot size={16} />
        <strong>Doodle AI Coach</strong>
        <span style={{ marginLeft: "auto", fontSize: 11, opacity: 0.7 }}>Gemini 3 Flash</span>
        <button
          onClick={clearChat}
          title="Clear conversation"
          style={{ color: "#fbf6e7", padding: 4 }}
          data-testid="chat-clear-btn"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="chat-key">
        <KeyRound size={14} />
        <input
          type={showKey ? "text" : "password"}
          placeholder="Paste your Gemini API key (optional — uses default)"
          value={apiKey}
          onChange={(e) => saveKey(e.target.value)}
          data-testid="chat-apikey-input"
        />
        <button onClick={() => setShowKey((s) => !s)} style={{ fontSize: 11, color: "#5a544c" }}>
          {showKey ? "Hide" : "Show"}
        </button>
      </div>

      <div className="chat-messages" data-testid="chat-messages">
        {messages.map((m) => (
          <div key={m.id} className={`bubble ${m.role}`}>{m.content}</div>
        ))}
        {streaming && <div className="bubble assistant">{streaming}<span style={{opacity:0.5}}>▌</span></div>}
        <div ref={endRef} />
      </div>

      <form className="chat-input-row" onSubmit={send}>
        <input
          placeholder="Ask Doodle anything about your schedule…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          data-testid="chat-input"
        />
        <button className="btn" type="submit" disabled={loading || !input.trim()} data-testid="chat-send-btn">
          <Send size={14} /> {loading ? "…" : "Send"}
        </button>
      </form>
    </div>
  );
}
