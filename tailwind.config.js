/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // aggiungi altre directory se necessario
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
