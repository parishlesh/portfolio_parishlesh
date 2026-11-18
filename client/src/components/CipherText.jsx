import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&*+=<>/\\";
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
const scramble = (s) => s.replace(/\S/g, rand);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Renders `text` as noise first, then resolves it left to right — like a
 * ciphertext being decrypted. `start` lets callers chain or replay it.
 */
export default function CipherText({ text, duration = 1200, delay = 0, start = true, className = "", as: Tag = "span" }) {
  const [out, setOut] = useState(() => (prefersReduced() ? text : scramble(text)));
  const raf = useRef();

  useEffect(() => {
    if (!start) return;
    if (prefersReduced()) { setOut(text); return; }
    let t0;
    const timer = setTimeout(() => {
      const tick = (now) => {
        t0 ??= now;
        const p = Math.min(1, (now - t0) / duration);
        const solved = Math.floor(p * text.length);
        setOut(
          text
            .split("")
            .map((c, i) => (i < solved || c === " " ? c : rand()))
            .join("")
        );
        if (p < 1) raf.current = requestAnimationFrame(tick);
      };
      raf.current = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf.current); };
  }, [text, duration, delay, start]);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}

CipherText.propTypes = {
  text: PropTypes.string.isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
  start: PropTypes.bool,
  className: PropTypes.string,
  as: PropTypes.elementType,
};
