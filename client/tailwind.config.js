/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#070B1F",
        deep: "#0E1533",
        line: "#1F2A55",
        fog: "#E7ECFF",
        dim: "#8C96BF",
        signal: "#5873FF",
        packet: "#FF6A4D",
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
        lift: '0 30px 80px -30px rgba(88,115,255,.45)',
      },
    },
  },
  plugins: [],
}
