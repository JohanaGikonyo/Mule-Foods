/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '72': '18rem', // Add custom width
        '84': '21rem',
      }
    },
  },
  plugins: [],
}
