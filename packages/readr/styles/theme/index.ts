export type ThemeType = typeof theme

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

export const theme = {
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
