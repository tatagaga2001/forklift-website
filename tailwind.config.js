/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#C89B3C',
          500: '#D4A017',
          600: '#8A650B',
        },
        industrial: {
          50:  '#F5F5F5',
          100: '#FFFFFF',
          200: '#E5E5E5',
          300: '#CCCCCC',
          400: '#888888',
          500: '#666666',
          600: '#3A3A3A',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#111111',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        heading: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
        thai: ['Sarabun', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(212,160,23,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212,160,23,0.08) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
