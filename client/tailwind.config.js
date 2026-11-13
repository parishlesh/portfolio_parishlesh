/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EEF1F6",
        ink: "#0D1A3A",
        signal: "#2B4DFF",
        packet: "#FF5A3C",
        muted: "#5B6785",
        rule: "#CBD3E2",
      },
      fontFamily: {
        display: ['Unbounded', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        islandMoment: ['"Island Moments"', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        top: '0 -1px 6px -1px rgba(0,0,0,.05), 0 -3px 4px -1px rgba(0,0,0,.03)',
        lift: '0 1px 0 #CBD3E2, 0 24px 48px -24px rgba(13,26,58,.35)',
      },
    },
  },
  plugins: [],
}
