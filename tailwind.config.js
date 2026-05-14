/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#F5C842',
          500: '#E8B800',
          600: '#C9A000',
        },
        industrial: {
          50:  '#F7F7F7',
          100: '#EBEBEB',
          200: '#D4D4D4',
          300: '#ABABAB',
          400: '#737373',
          500: '#4A4A4A',
          600: '#2E2E2E',
          700: '#1E1E1E',
          800: '#141414',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        heading: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
        thai: ['Sarabun', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(245,200,66,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245,200,66,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
