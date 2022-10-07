/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionDuration: {
        0: '0ms',
      },
      spacing: {
        header: '64px',
        'header-md': '80px',
      },
    },
  },
  plugins: [require('tailwind-clip-path')],
}
