// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLCI_` 開頭)
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'
let SITE_URL: string
let GA_TRACKING_ID: string
let DONATION_PAGE_URL: string

switch (ENV) {
  case 'prod':
    SITE_URL = 'www.readr.tw'
    GA_TRACKING_ID = 'G-4Z12TPZTMB'
    DONATION_PAGE_URL = 'https://readr.oen.tw/good'
    break

  case 'staging':
    SITE_URL = 'staging.readr.tw'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    DONATION_PAGE_URL = 'https://readr.oen.tw/good'
    break

  case 'dev':
    SITE_URL = 'dev.readr.tw'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    DONATION_PAGE_URL = 'https://readr.testing.oen.tw/good'
    break

  default:
    SITE_URL = 'localhost'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    DONATION_PAGE_URL = 'https://readr.testing.oen.tw/good'
    break
}

// Set the QA_RECORD_CONFIG variables to { id1: '8', id2: '9' } if ENV is dev or local, and to { id1: '6', id2: '7' } if ENV is staging or prod.

const QA_RECORD_CONFIG = {
  variables:
    ENV === 'local' || 'dev' ? { id1: '8', id2: '9' } : { id1: '6', id2: '7' },
}

export { DONATION_PAGE_URL, ENV, GA_TRACKING_ID, QA_RECORD_CONFIG, SITE_URL }
