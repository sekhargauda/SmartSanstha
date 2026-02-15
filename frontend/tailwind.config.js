/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3f2',
          100: '#fee5e2',
          200: '#fecfca',
          300: '#fdada4',
          400: '#fa7e6f',
          500: '#f25942',
          600: '#df3a25',
          700: '#bc2e1b',
          800: '#9c291a',
          900: '#81271d',
        },
        accent: {
          50: '#fef6ee',
          100: '#fdead7',
          200: '#fad1ae',
          300: '#f7b17a',
          400: '#f38744',
          500: '#f06820',
          600: '#e14d16',
          700: '#ba3914',
          800: '#942f18',
          900: '#782916',
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.3s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out',
        'spin-slow': 'spin-slow 3s linear infinite',
      },
    },
  },
  plugins: [],
}