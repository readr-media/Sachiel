export type ThemeType = typeof theme

export const mediaSize = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 960,
  xl: 1200,
  xxl: 1400,
}

export const theme = {
  mediaSize,
  breakpoint: {
    xs: `@media (min-width: ${mediaSize.xs}px)`,
    sm: `@media (min-width: ${mediaSize.sm}px)`,
    md: `@media (min-width: ${mediaSize.md}px)`,
    lg: `@media (min-width: ${mediaSize.lg}px)`,
    xl: `@media (min-width: ${mediaSize.xl}px)`,
    xxl: `@media (min-width: ${mediaSize.xxl}px)`,
  },
  width: {
    // 全站
    main: '1096px', // 網頁內容
    // 首頁 - 編輯精選區塊
    featuredEditorChoiceCard: '720px',
    editorChoiceCard: '296px',
  },
  zIndex: {
    top: 10000,
    articleType: 650, // type: `frame`, `blank`, `scrollablevideo` need to cover `header`
    headerMobile: 550, // legency value, keep it for compatibility
    headerDesktop: 499, // legency value, keep it for compatibility
    maskOfPicture: 10,
  },
}

export default theme
