/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '768px',
        md: '960px',
        lg: '1200px',
        xl: '1440px',
        xxl: '1920px',
      },
      height: {
        15: '3.75rem',
      },
      padding: {
        15: '3.75rem',
      },
    },
  },
  plugins: [],
}
