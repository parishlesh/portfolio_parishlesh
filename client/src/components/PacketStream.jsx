import { useEffect, useState } from "react";
import CipherText from "./CipherText";

// A tiny looping conversation. Each message lands as ciphertext and decrypts.
const SCRIPT = [
  { from: "them", text: "hey, what do you build?" },
  { from: "me", text: "real-time apps: chat, calls, live dashboards" },
  { from: "them", text: "what's the stack?" },
  { from: "me", text: "React, Next.js, Node, MongoDB, Socket.IO, WebRTC" },
  { from: "them", text: "and the chat is actually encrypted?" },
  { from: "me", text: "end to end. the server only ever sees ciphertext" },
  { from: "them", text: "nice. how do I reach you?" },
  { from: "me", text: "contact form below, I reply fast" },
];

const VISIBLE = 4;

export default function PacketStream() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 2600);
    return () => clearInterval(id);
  }, []);

  const msgs = Array.from({ length: count }, (_, i) => ({ ...SCRIPT[i % SCRIPT.length], id: i }))
    .slice(-VISIBLE);

  return (
    <div className="relative w-full max-w-md rounded-2xl border border-rule bg-white/80 backdrop-blur shadow-lift overflow-hidden" aria-hidden="true">
      <div className="flex items-center justify-between px-5 py-3 border-b border-rule">
        <div className="flex items-center gap-2">
          <span className="live-dot h-2 w-2 rounded-full bg-signal" />
          <span className="font-mono text-xs text-muted">wss://vibelink — live</span>
        </div>
        <span className="font-mono text-[11px] text-muted">AES-GCM</span>
      </div>
      <ul className="flex flex-col gap-3 px-5 py-5 h-[19rem] justify-end">
        {msgs.map((m) => (
          <li key={m.id} className={`packet-enter flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <span
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                m.from === "me"
                  ? "bg-ink text-white rounded-br-md"
                  : "bg-paper text-ink rounded-bl-md"
              }`}
            >
              <CipherText text={m.text} duration={700} delay={250} className="font-mono text-[13px]" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
