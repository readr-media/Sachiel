// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLCI_` 開頭)
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'
let SITE_URL: string
let GA_TRACKING_ID: string
let GTM_ID: string
let DONATION_PAGE_URL: string
let QA_RECORD_CONFIG: { variables: Record<string, string> }
let GLOBAL_CACHE_SETTING: string
let GOOGLE_ADSENSE_AD_CLIENT: string
let HEADER_JSON_URL: string
let LATEST_POSTS_URL: string
let LATEST_POSTS_IN_CATEGORIES_URL: string
let LATEST_POSTS_IN_CATEGORIES_FOR_CATEGORY_PAGE_URL: string
switch (ENV) {
  case 'prod':
    SITE_URL = 'www.readr.tw'
    GA_TRACKING_ID = 'G-4Z12TPZTMB'
    GTM_ID = 'GTM-TH2M74H'
    DONATION_PAGE_URL = 'https://readr.oen.tw/good'
    QA_RECORD_CONFIG = { variables: { id1: '6', id2: '7' } }
    GLOBAL_CACHE_SETTING = 'public, max-age=300'
    GOOGLE_ADSENSE_AD_CLIENT = 'ca-pub-9990785780499264'
    HEADER_JSON_URL = 'https://statics.readr.tw/json/header.json'
    LATEST_POSTS_URL = 'https://statics.readr.tw/json/latest-posts.json'
    LATEST_POSTS_IN_CATEGORIES_URL =
      'https://statics.readr.tw/json/latest-posts-in-categories.json'
    LATEST_POSTS_IN_CATEGORIES_FOR_CATEGORY_PAGE_URL =
      'https://statics.readr.tw/json/sections-posts-listing.json'
    break

  case 'staging':
    SITE_URL = 'staging.readr.tw'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    GTM_ID = 'GTM-WZ6TDW4'
    DONATION_PAGE_URL = 'https://readr.oen.tw/good'
    QA_RECORD_CONFIG = { variables: { id1: '6', id2: '7' } }
    GLOBAL_CACHE_SETTING = 'public, max-age=300'
    GOOGLE_ADSENSE_AD_CLIENT = 'ca-pub-9990785780499264'
    HEADER_JSON_URL =
      'https://storage.googleapis.com/statics-readr-tw-staging/json/header.json'
    LATEST_POSTS_URL =
      'https://storage.googleapis.com/statics-readr-tw-staging/json/latest-posts.json'
    LATEST_POSTS_IN_CATEGORIES_URL =
      'https://storage.googleapis.com/statics-readr-tw-staging/json/latest-posts-in-categories.json'
    LATEST_POSTS_IN_CATEGORIES_FOR_CATEGORY_PAGE_URL =
      'https://storage.googleapis.com/statics-readr-tw-staging/json/sections-posts-listing.json'
    break

  case 'dev':
    SITE_URL = 'dev.readr.tw'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    GTM_ID = 'GTM-PQSSJ5V'
    DONATION_PAGE_URL = 'https://readr.testing.oen.tw/good'
    QA_RECORD_CONFIG = { variables: { id1: '8', id2: '9' } }
    GLOBAL_CACHE_SETTING = 'no-store'
    GOOGLE_ADSENSE_AD_CLIENT = 'ca-pub-9990785780499264'
    HEADER_JSON_URL =
      'https://storage.googleapis.com/statics-readr-tw-dev/json/header.json'
    LATEST_POSTS_URL =
      'https://storage.googleapis.com/statics-readr-tw-dev/json/latest-posts.json'
    LATEST_POSTS_IN_CATEGORIES_URL =
      'https://storage.googleapis.com/statics-readr-tw-dev/json/latest-posts-in-categories.json'
    LATEST_POSTS_IN_CATEGORIES_FOR_CATEGORY_PAGE_URL =
      'https://storage.googleapis.com/statics-readr-tw-dev/json/sections-posts-listing.json'
    break

  default:
    SITE_URL = 'localhost'
    GA_TRACKING_ID = 'G-YDKYSDG3RL'
    GTM_ID = 'GTM-PQSSJ5V'
    DONATION_PAGE_URL = 'https://readr.testing.oen.tw/good'
    QA_RECORD_CONFIG = { variables: { id1: '8', id2: '9' } }
    GLOBAL_CACHE_SETTING = 'no-store'
    GOOGLE_ADSENSE_AD_CLIENT = 'ca-pub-9990785780499264'
    HEADER_JSON_URL =
      'https://storage.googleapis.com/statics-readr-tw-dev/json/header.json'
    LATEST_POSTS_URL =
      'https://storage.googleapis.com/statics-readr-tw-dev/json/latest-posts.json'
    LATEST_POSTS_IN_CATEGORIES_URL =
      'https://storage.googleapis.com/statics-readr-tw-dev/json/latest-posts-in-categories.json'
    LATEST_POSTS_IN_CATEGORIES_FOR_CATEGORY_PAGE_URL =
      'https://storage.googleapis.com/statics-readr-tw-dev/json/sections-posts-listing.json'
    break
}

export {
  DONATION_PAGE_URL,
  ENV,
  GA_TRACKING_ID,
  GLOBAL_CACHE_SETTING,
  GOOGLE_ADSENSE_AD_CLIENT,
  GTM_ID,
  HEADER_JSON_URL,
  LATEST_POSTS_IN_CATEGORIES_FOR_CATEGORY_PAGE_URL,
  LATEST_POSTS_IN_CATEGORIES_URL,
  LATEST_POSTS_URL,
  QA_RECORD_CONFIG,
  SITE_URL,
}
