import { useEffect, useState } from "react";
import CipherText from "./CipherText";

// A tiny looping conversation. Each message lands as ciphertext and decrypts.
const SCRIPT = [
  { from: "them", text: "hey, what have you shipped?" },
  { from: "me", text: "an LMS for 2,000+ employees and AI-proctored exams" },
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
    <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-night/70 backdrop-blur overflow-hidden" aria-hidden="true">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="live-dot h-2 w-2 rounded-full bg-packet" />
          <span className="font-mono text-xs text-white/50">wss://vibelink — live</span>
        </div>
        <span className="font-mono text-[11px] text-white/50">AES-GCM</span>
      </div>
      <ul className="flex flex-col gap-3 px-5 py-5 h-[17rem] justify-end overflow-hidden">
        {msgs.map((m) => (
          <li key={m.id} className={`packet-enter flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <span
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
                m.from === "me"
                  ? "bg-signal text-white rounded-br-md"
                  : "bg-white/10 text-white/90 rounded-bl-md"
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
