/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
        white: '#FFFFFF',
        black: {
          100: '#414246',
          200: '#2D343A',
          300: '#332929',
          400: '#292A2D',
          500: '#161617',
        },
        'custom-gray': {
          100: '#F6F6FB',
          200: 'rgba(208, 210, 216, 0.7)',
          300: '#DADCE3',
          400: '#D0D2D8',
          500: '#E0E0E0',
          600: '#CBCBCB',
          700: 'rgba(0, 0, 0, 0.3)',
          800: '#474747',
          900: '#545454',
        },
        'custom-blue': {
          100: '#F2FDFF',
          200: '#0A84FF',
          300: '#007AFF',
        },
        'custom-red': {
          100: '#FFF5F5',
          200: '#F65858',
          300: '#F34B4B',
          400: '#FF453A',
          500: '#EE4141',
        },
        readr: '#EBF02C',
      },
    },
  },
  plugins: [],
}
