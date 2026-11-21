// Backend URL. Set VITE_API_URL in Vercel (and optionally in client/.env.local);
// falls back to the local server during development.
export const API = import.meta.env.VITE_API_URL || "http://localhost:5000"
