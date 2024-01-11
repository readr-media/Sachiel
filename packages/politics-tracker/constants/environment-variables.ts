// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLIC_` 開頭)
// 該檔案目前無法使用 import 語法來引入任何依賴，因為在 build 階段時，ts-import (next-sitemap) 會出問題

/** 系統環境 (因該檔案目前無法使用 import，故先放置於此處) */
enum SYSTEM_ENV {
  LOCALHOST = 'localhost',
  DEVELOPMENT = 'dev',
  PRODUCTION = 'prod',
}

/** 因該檔案目前無法使用 import，故先放置於此處 */
const isInEnvVars = (vars: SYSTEM_ENV[], str: string): str is SYSTEM_ENV => {
  return vars.reduce(
    (isValid: boolean, envVar: SYSTEM_ENV) =>
      isValid || Boolean(envVar === str),
    false
  )
}

const envVars = Object.values(SYSTEM_ENV)
const envStr = String(process.env.NEXT_PUBLIC_ENV)

const env: SYSTEM_ENV = isInEnvVars(envVars, envStr)
  ? envStr
  : SYSTEM_ENV.LOCALHOST

let siteUrl: string
let gaTrackingId: string
let prefixOfJSONForLanding2024: string // Used on the client side to fetch.
let gtmId: string
let feedbackFormApi: string =
  process.env.NEXT_PUBLIC_FEEDBACK_FORM_API ??
  'https://storytelling-prod-4g6paft7cq-de.a.run.app'
let postPathOfREADr: string
let gcsBucketForElectionDataLoader: string
let ELECTION_2024 = {
  url: 'https://www.readr.tw/project/3/election2024-homepage/index.html',
  shouldShowToggleButton: false,
}

switch (env) {
  case SYSTEM_ENV.DEVELOPMENT:
    gaTrackingId =
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://whoareyou-dev.readr.tw'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs-dev.readr.tw/json'
    gtmId = 'GTM-NRMC5WWL'
    postPathOfREADr = 'https://dev.readr.tw/post'
    gcsBucketForElectionDataLoader = 'elections-dev'
    ELECTION_2024 = {
      url: 'https://www.readr.tw/project/3/election2024-homepage/index.html',
      shouldShowToggleButton: true,
    }
    break
  case SYSTEM_ENV.PRODUCTION: {
    gaTrackingId =
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://whoareyou.readr.tw'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs.readr.tw/json'
    gtmId = 'GTM-5PG5FN7J'
    postPathOfREADr = 'https://www.readr.tw/post'
    gcsBucketForElectionDataLoader = 'elections'
    ELECTION_2024 = {
      url: 'https://www.readr.tw/project/3/election2024-homepage/index.html',
      shouldShowToggleButton: false,
    }
    break
  }
  default:
    gaTrackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID ?? ''
    siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs-dev.readr.tw/json'
    gtmId = 'GTM-NRMC5WWL'
    postPathOfREADr = 'https://dev.readr.tw/post'
    gcsBucketForElectionDataLoader = 'elections-dev'
    ELECTION_2024 = {
      url: 'https://www.readr.tw/project/3/election2024-homepage/index.html',
      shouldShowToggleButton: false,
    }
    break
}

export {
  ELECTION_2024,
  env,
  feedbackFormApi,
  gaTrackingId,
  gcsBucketForElectionDataLoader,
  gtmId,
  postPathOfREADr,
  prefixOfJSONForLanding2024,
  siteUrl,
  SYSTEM_ENV,
}
