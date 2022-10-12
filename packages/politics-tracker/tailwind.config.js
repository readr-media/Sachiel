/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        lg: '1200px',
      },
      backgroundColor: {
        button: '#F7BA31',
        'button-2': '#B3800D',
        'button-3': '#FFFCF3',
        label: '#0F2D35',
        default: '#838383',
        politics: '#FFFCF3',
        // politics/title
        'title-person': '#8379F8',
        'title-campaign': '#F58439',
        'title-completed': '#2FB7BF',
        'title-waiting': '#DB4C65',
      },
      textColor: {
        main: '#0F2D35',
        error: '#C0374F',
        control: '#B3800D',
        default: '#838383',
      },
      boxShadow: {
        // politics/title
        'title-bottom': 'inset 0px -4px 0px #000000',
        'title-bottom-and-right':
          'inset 0px -4px 0px #000000, inset -4px 0px 0px #000000',
        'title-bottom-and-left':
          'inset 0px -4px 0px #000000, inset 4px 0px 0px #000000',
        'title-top-and-left':
          'inset 0px 4px 0px #000000, inset 4px 0px 0px #000000',
        'title-bottom-and-both-x':
          'inset 0px -4px 0px #000000, inset 4px 0px 0px #000000, inset -4px 0px 0px #000000',
        'title-both-y-and-left':
          'inset 0px -4px 0px #000000, inset 0px 4px 0px #000000, inset 4px 0px 0px #000000',
        control:
          'inset 0px 4px 0px #000000, inset 0px -4px 0px #000000, inset 4px 0px 0px #000000, inset -4px 0px 0px #000000',
        'control-before':
          'inset 0px -4px 0px #000000, inset 4px 0px 0px #000000, inset -2px 0px 0px #000000',
        'control-after':
          'inset 0px 4px 0px #000000, inset 0px -4px 0px #000000, inset -4px 0px 0px #000000',
        'politics-top': 'inset 0px 4px 0px #000000',
        'politics-bottom-and-both-x':
          'inset 0px -4px 0px #000000, inset 4px 0px 0px #000000, inset -4px 0px 0px #000000',
      },
      lineHeight: {
        main: '1.2',
        sub: '1.3',
      },
      fontSize: ({ theme }) => ({
        // politics/title
        'title-main': ['24px', theme('lineHeight.main')],
        'title-main-md': ['32px', theme('lineHeight.main')],
        'title-sub': ['16px', theme('lineHeight.sub')],
        'title-sub-md': ['18px', theme('lineHeight.sub')],
      }),
      spacing: {
        header: '64px',
        'header-md': '80px',
      },
      transitionDuration: {
        0: '0ms',
      },
      keyframes: {
        lightUp: {
          '0%, 100%': { filter: 'opacity(0%)' },
          '50%': { filter: 'opacity(100%)' },
        },
      },
      animation: {
        lightUp: 'lightUp 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // @ts-ignore: no definition
    require('tailwind-clip-path'),
    require('@tailwindcss/line-clamp'),
  ],
}
