/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '768px',
      md: '960px',
      lg: '1200px',
      xl: '1440px',
      xxl: '1920px',
    },
    extend: {
      height: {
        15: '3.75rem',
      },
      minHeight: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      padding: {
        15: '3.75rem',
      },
    },
  },
  plugins: [],
}
