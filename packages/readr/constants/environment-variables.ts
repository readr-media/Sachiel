// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLCI_` 開頭)
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'
let SITE_URL: string
let GA_TRACKING_ID: string

switch (ENV) {
  case 'prod':
    SITE_URL = 'www.readr.tw'
    GA_TRACKING_ID = 'G-4Z12TPZTMB'
    break

  case 'staging':
    SITE_URL = 'staging.readr.tw'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    break

  case 'dev':
    SITE_URL = 'dev.readr.tw'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    break

  default:
    SITE_URL = 'localhost'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    break
}

export { ENV, GA_TRACKING_ID, SITE_URL }
