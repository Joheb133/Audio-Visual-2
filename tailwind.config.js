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
        },
        myBounce: {
          '0% ,100%': {
            transform: 'translateY(-100%)',
            animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
          }
        }
      },
      animation: {
        scroll: 'scroll 5s linear',
        myBounce: 'myBounce 1s infinite'
      }
    },
    plugins: [],
  }
}