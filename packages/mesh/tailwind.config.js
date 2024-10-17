/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
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
      zIndex: {
        layout: 10,
        modal: 100,
      },
      width: {
        maxContent: '1440px',
        maxMain: '1120px',
        maxDesktopNavigation: '680px',
        nav: {
          sm: '128px',
          md: '220px',
          xl: '320px',
        },
        articleNav: '300px',
        articleMain: '600px',
        articleAside: {
          lg: '220px',
          xl: '340px',
        },
      },
      spacing: {
        15: '3.75rem',
      },
      height: {
        header: {
          default: '60px',
          sm: '68px',
        },
        footer: {
          default: '641px',
          sm: '317px',
        },
        nav: {
          default: '64px',
        },
        toast: '32px',
      },
      minHeight: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
      colors: {
        primary: {
          100: {
            DEFAULT: '#F2F2F4',
            dark: '#FEFEFF',
          },
          200: {
            DEFAULT: '#E5E6E9',
            dark: '#FDFDFE',
          },
          300: {
            DEFAULT: '#CCCED4',
            dark: '#FCFCFE',
          },
          400: {
            DEFAULT: '#B2B5BE',
            dark: '#FAFAFD',
          },
          500: {
            DEFAULT: '#7F8493',
            dark: '#F9F9FC',
          },
          600: {
            DEFAULT: '#575D71',
            dark: '#F7F7FC',
          },
          700: {
            DEFAULT: '#212944',
            dark: '#F6F6FB',
          },
          800: {
            DEFAULT: '#000928',
            dark: '#E4E4EA',
          },
        },
        'single-layer': {
          DEFAULT: '#FFFFFF',
          dark: '#292A2D',
        },
        'multi-layer-light': {
          DEFAULT: '#F6F6FB',
          dark: '#414246',
        },
        'multi-layer-dark': {
          DEFAULT: '#F6F6FB',
          dark: '#161617',
        },
        'custom-blue': {
          DEFAULT: '#007AFF',
          dark: '#0A84FF',
        },
        'custom-blue-hover': {
          DEFAULT: '#0170E9',
          dark: '#007AFF',
        },
        'custom-red-text': {
          DEFAULT: '#EE4141',
          dark: '#FF453A',
        },
        'custom-red': {
          DEFAULT: '#F34B4B',
          dark: '#F65858',
        },
        'highlight-red': {
          DEFAULT: '#FFF5F5',
          dark: '#332929',
        },
        'highlight-blue': {
          DEFAULT: '#F2FDFF',
          dark: '#2D343A',
        },
        'custom-gray-light': {
          DEFAULT: '#DADCE3',
          dark: '#545454',
        },
        'custom-gray-dark': {
          DEFAULT: '#D0D2D8',
          dark: '#474747',
        },
        'lightbox-light': {
          DEFAULT: 'rgba(223, 223, 225, 0.7)',
          dark: 'rgba(223, 223, 225, 0.7)',
        },
        'lightbox-dark': {
          DEFAULT: 'rgba(0, 0, 0, 0.3)',
          dark: 'rgba(0, 0, 0, 0.3)',
        },
        loading: {
          DEFAULT: 'rgba(0, 9, 40, 0.15)',
          dark: 'rgba(0, 9, 40, 0.15)',
        },
        disable: {
          DEFAULT: '#E0E0E0',
          dark: '#CBCBCB',
        },
        brand: '#EBF02C',
      },
      boxShadow: {
        'bottom-sheet': '0 -8px 20px 0 rgba(0, 0, 0, 0.1)',
        modal: '0 2px 40px 0 rgba(0, 0, 0, 0.1)',
        card: '0 2px 2px 0 rgba(0, 9, 40, 0.1), 0 0 4px 0 rgba(0, 9, 40, 0.1)',
        'light-box':
          '0px 0px 24px 0px rgba(0, 9, 40, 0.1),0px 2px 40px 0px rgba(0, 9, 40, 0.1)',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // apply to both :hover and :active but doesn't work for group-*
      addVariant('hover-or-active', ['&:hover', '&:active'])
    }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
