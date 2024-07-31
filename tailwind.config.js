/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6347',
        secondary: '#4caf50',
        accent: '#f9a825',
        background: '#f3f4f6',
      },
    },
  },
  plugins: [],
};