const mediaSize = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
  '3xl': 1600,
  '4xl': 1920,
}
const sharedColor = {
  gray: '#838383',
  blue: '#544AC9',
  black: '#000000',
  white: '#FFFFFF',
  green: '#2FB7BF',
}

export const theme = {
  backgroundColor: {
    purple: '#8379F8',
    blue: sharedColor.blue,
    gray: sharedColor.gray,
    orange: '#F58439',
    yellow: '#F6BA31',
    green: sharedColor.green,
  },
  textColor: {
    blue: sharedColor.blue,
    gray: sharedColor.gray,
    green: '#208F96', //different with backgroundColor.green
    yellow: '#B2800D', //different with backgroundColor.yellow
    red: '#C0374F',

    black: '#0F2D35',
    white: '#FFFFFF',
  },
  borderColor: {
    black: sharedColor.black,
    white: sharedColor.white,
  },
  fontSize: {
    'title-main': 'font-size:24px; line-height: 1.2',
    'title-main-md': 'font-size:32px; line-height: 1.2',
    'title-sub': 'font-size:16px; line-height: 1.3',
    'title-sub-md': 'font-size:18px; line-height: 1.3',
  },
  breakpoint: {
    xs: `@media (min-width: ${mediaSize.xs}px)`,
    sm: `@media (min-width: ${mediaSize.sm}px)`,
    md: `@media (min-width: ${mediaSize.md}px)`,
    lg: `@media (min-width: ${mediaSize.lg}px)`,
    xl: `@media (min-width: ${mediaSize.xl}px)`,
    xxl: `@media (min-width: ${mediaSize.xxl}px)`,
    '3xl': `@media (min-width: ${mediaSize['3xl']}px)`,
    '4xl': `@media (min-width: ${mediaSize['4xl']}px)`,
  },
}

export default theme
