// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLCI_` 開頭)
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'
let SITE_URL: string

switch (ENV) {
  case 'prod':
    SITE_URL = 'www.readr.tw'
    break

  case 'staging':
    SITE_URL = 'staging.readr.tw'
    break

  case 'dev':
    SITE_URL = 'dev.readr.tw'
    break

  default:
    SITE_URL = 'localhost'
    break
}

export { ENV, SITE_URL }
