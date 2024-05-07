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
      width: {
        maxContent: '1440px',
        maxMain: '1120px',
        nav: {
          sm: '128px',
          md: '220px',
          xl: '320px',
        },
      },
      spacing: {
        15: '3.75rem',
      },
      height: {
        header: {
          default: '60px',
          sm: '64px',
        },
        footer: {
          default: '641px',
          sm: '317px',
        },
        nav: {
          default: '64px',
        },
      },
      minHeight: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
    },
  },
  plugins: [],
}
