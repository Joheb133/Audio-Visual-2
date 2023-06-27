/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0% ,100%': { transform: 'translateX(0)' },
          '40%, 60%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        scroll: 'scroll 5s linear'
      }
    },
    plugins: [],
  }
}