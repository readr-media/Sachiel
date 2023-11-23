// 這裡管理的是在 Build 階段就會寫死數值的環境變數 (通常為 `NEXT_PUBLIC_` 開頭)
const envList: string[] = ['dev', 'prod']
const env: string = envList.includes(String(process.env.NEXT_PUBLIC_ENV))
  ? String(process.env.NEXT_PUBLIC_ENV)
  : 'localhost'

let siteUrl: string
let gaTrackingId: string
let prefixOfJSONForLanding2024: string // Used on the client side to fetch.
let gtmId: string
let feedbackFormApi: string =
  process.env.NEXT_PUBLIC_FEEDBACK_FORM_API ??
  'https://storytelling-prod-4g6paft7cq-de.a.run.app'

const ProgrammableSearchEngineID: string =
  process.env.NEXT_PUBLIC_PROGRAMABLE_SEARCH_ENGINE_ID ?? 'SEARCH_ENGINE_ID'
const ProgrammableSearchAPIKey: string =
  process.env.NEXT_PUBLIC_PROGRAMABLE_SEARCH_API_KEY ?? 'SEARCH_API_KEY'

switch (env) {
  case 'dev':
    gaTrackingId =
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://whoareyou-dev.readr.tw'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs-dev.readr.tw/json'
    gtmId = 'GTM-NRMC5WWL'
    break
  case 'prod': {
    gaTrackingId =
      process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://whoareyou.readr.tw'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs.readr.tw/json'
    gtmId = 'GTM-5PG5FN7J'
    break
  }
  default:
    gaTrackingId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID ?? ''
    siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs-dev.readr.tw/json'
    gtmId = 'GTM-NRMC5WWL'
    break
}

export {
  env,
  feedbackFormApi,
  gaTrackingId,
  gtmId,
  prefixOfJSONForLanding2024,
  ProgrammableSearchAPIKey,
  ProgrammableSearchEngineID,
  siteUrl,
}
