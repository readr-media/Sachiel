const LOGO_ICONS = {
  mobile: {
    size: { width: 144, height: 36 },
    icon: 'icon-readr-logoA-mobile',
    href: '/',
  },
  nonMobile: {
    size: { width: 176, height: 44 },
    icon: 'icon-readr-logoA-desktop',
    href: '/',
  },
} as const

// TODO: update path
const DOWNLOAD_APP_LINKS = [
  {
    size: { width: 162.1, height: 48 },
    icon: 'icon-google-play',
    href: '/',
    gtmName: 'googleplay',
  },
  {
    size: { width: 130.33, height: 48 },
    icon: 'icon-app-store',
    href: '/',
    gtmName: 'appstore',
  },
] as const

// TODO: update path
const FOOTER_NAV_LINKS = [
  // TODO: Uncomment it when page is complete
  // { text: '關於我們', href: '/' },
  { text: '聯絡我們', href: '/contact', gtmName: 'contact' },
  {
    text: '隱私政策',
    href: '/policy/privacy-policy',
    gtmName: 'privacy_terms',
  },
  {
    text: '服務條款',
    href: '/policy/terms-of-service',
    gtmName: 'service_terms',
  },
] as const

// TODO: update path
const FOOTER_SHARED_ICONS = [
  {
    icon: { default: 'icon-facebook', hover: 'icon-facebook-hover' },
    href: '/',
    size: { width: 24, height: 24 },
    gtmName: 'FB',
  },
  {
    icon: { default: 'icon-x', hover: 'icon-x-hover' },
    href: '/',
    size: { width: 24, height: 20 },
    gtmName: 'twitter',
  },
  {
    icon: { default: 'icon-instagram', hover: 'icon-instagram-hover' },
    href: '/',
    size: { width: 22, height: 22 },
    gtmName: 'IG',
  },
  {
    icon: { default: 'icon-discord', hover: 'icon-discord-hover' },
    href: '/',
    size: { width: 21, height: 24 },
    gtmName: 'DC',
  },
] as const

const FOOTER_COMPANY_INFOS = [
  '精鏡傳媒股份有限公司',
  '114 台北市內湖區堤頂大道一段 365 號 7 樓',
  'readr@readr.tw',
] as const

// TODO: update href according to SPEC
const NON_MOBILE_NAV_ICONS = {
  first: [
    {
      icon: {
        default: 'icon-popular-lg',
        hover: 'icon-popular-lg-hover',
        on: 'icon-popular-lg-on',
      },
      href: '/',
      text: '首頁',
      gtmName: 'homepage',
    },
    {
      icon: {
        default: 'icon-social-lg',
        hover: 'icon-social-lg-hover',
        on: 'icon-social-lg-on',
      },
      href: '/social',
      text: '社群',
      gtmName: 'social',
    },
    {
      icon: {
        default: 'icon-latest-lg',
        hover: 'icon-latest-lg-hover',
        on: 'icon-latest-lg-on',
      },
      href: '/media',
      text: '最新',
      gtmName: 'media',
    },
  ],
  second: [
    {
      icon: {
        default: 'icon-profile-lg',
        hover: 'icon-profile-lg-hover',
        on: 'icon-profile-lg-on',
      },
      href: '/profile',
      text: '個人檔案',
      gtmName: 'profile',
    },
    {
      icon: {
        default: 'icon-wallet-lg',
        hover: 'icon-wallet-lg-hover',
        on: 'icon-wallet-lg-on',
      },
      href: '/point',
      text: '讀選點數',
      gtmName: 'point',
    },
    {
      icon: {
        default: 'icon-bookmark-lg',
        hover: 'icon-bookmark-lg-hover',
        on: 'icon-bookmark-lg-on',
      },
      href: '/profile',
      text: '書籤',
      gtmName: 'bookmark',
    },
  ],
  third: [
    {
      icon: {
        default: 'icon-setting-lg',
        hover: 'icon-setting-lg-hover',
        on: 'icon-setting-lg-on',
      },
      href: '/setting',
      text: '設定',
      gtmName: 'setting',
    },
  ],
} as const

// TODO: update href according to SPEC
const MOBILE_NAV_ICONS = [
  {
    icon: {
      default: 'icon-popular',
      hover: 'icon-popular-hover',
      on: 'icon-popular-on',
    },
    href: '/',
    text: '首頁',
    gtmName: 'homepage',
  },
  {
    icon: {
      default: 'icon-social',
      hover: 'icon-social-hover',
      on: 'icon-social-on',
    },
    href: '/social',
    text: '社群',
    gtmName: 'social',
  },
  {
    icon: {
      default: 'icon-latest',
      hover: 'icon-latest-hover',
      on: 'icon-latest-on',
    },
    href: '/media',
    text: '最新',
    gtmName: 'media',
  },
  {
    icon: {
      default: 'icon-wallet',
      hover: 'icon-wallet-hover',
      on: 'icon-wallet-on',
    },
    href: '/point',
    text: '讀選點數',
    gtmName: 'point',
  },
  {
    icon: {
      default: 'icon-profile',
      hover: 'icon-profile-hover',
      on: 'icon-profile-on',
    },
    href: '/profile',
    text: '個人檔案',
    gtmName: 'profile',
  },
] as const

export {
  DOWNLOAD_APP_LINKS,
  FOOTER_COMPANY_INFOS,
  FOOTER_NAV_LINKS,
  FOOTER_SHARED_ICONS,
  LOGO_ICONS,
  MOBILE_NAV_ICONS,
  NON_MOBILE_NAV_ICONS,
}
