/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        islandMoment: ['"Island Moments"', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'top': '0 -1px 6px -1px rgba(0, 0, 0, 0.05), 0 -3px 4px -1px rgba(0, 0, 0, 0.03)',
      },
    },
    plugins: [],
  }
}