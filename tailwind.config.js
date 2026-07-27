/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-dark': '#04334c',
        'teal-medium': '#0d7377',
        'teal-accent': '#14b8a6',
        'teal-light': '#f0faf9',
      },
      fontFamily: {
        'naskh': ['"Noto Naskh Arabic"', 'serif'],
        'tajawal': ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
