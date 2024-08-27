/** @type {import('tailwindcss').Config} */
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#046425',
        'secondary': '#A4DA22'
      },
      fontFamily: {
        'primary': ["Teko", 'sans-serif'],
        
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}

