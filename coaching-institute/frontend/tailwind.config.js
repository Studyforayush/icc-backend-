/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7ff',
          100: '#f0eeff',
          200: '#ddd5ff',
          300: '#c9b5ff',
          400: '#a582ff',
          500: '#8860ff',
          600: '#7d4eff',
          700: '#6d3ee9',
          800: '#5a34cc',
          900: '#4a2ca3',
        },
        secondary: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
