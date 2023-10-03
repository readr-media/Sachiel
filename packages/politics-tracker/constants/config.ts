const envList: string[] = ['dev', 'prod']
const env: string = envList.includes(String(process.env.NEXT_PUBLIC_ENV))
  ? String(process.env.NEXT_PUBLIC_ENV)
  : 'localhost'

// environment independent
const cmsApiUrl: string = process.env.CMS_API_URL ?? ''
const readrCmsApiUrl: string = process.env.READR_CMS_API_URL ?? ''
let feedbackFormConfig: Partial<Record<'formId' | 'fieldId', string>> = {}
try {
  feedbackFormConfig = JSON.parse(process.env.FEEDBACK_FORM_CONFIG ?? '')
} catch (e) {
  feedbackFormConfig = {
    formId: '',
    fieldId: '',
  }
}

// environemnt dependent
let siteUrl: string
let gaTrackingId: string
let urlOfJsonForlandingPage: string

// 2024 選舉專用 Feature Toggle：因為政見資料尚未完整，目前 2024 選舉新增異動只在 dev 呈現，prod 預設隱藏。
let ELECTION_2024_FEATURE_TOGGLE: string = 'on'

switch (env) {
  case 'dev':
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    urlOfJsonForlandingPage = process.env.URL_OF_JSON_FOR_LANDING_PAGE ?? ''
    siteUrl = process.env.SITE_URL ?? 'https://whoareyou-dev.readr.tw'
    ELECTION_2024_FEATURE_TOGGLE = 'on'
    break
  case 'prod': {
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    urlOfJsonForlandingPage = process.env.URL_OF_JSON_FOR_LANDING_PAGE ?? ''
    siteUrl = process.env.SITE_URL ?? 'https://whoareyou.readr.tw'
    ELECTION_2024_FEATURE_TOGGLE = 'off'
    break
  }
  default:
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? ''
    urlOfJsonForlandingPage = process.env.URL_OF_JSON_FOR_LANDING_PAGE ?? ''
    siteUrl = process.env.SITE_URL ?? 'http://localhost:3000'
    ELECTION_2024_FEATURE_TOGGLE = 'on'
    break
}

export {
  cmsApiUrl,
  ELECTION_2024_FEATURE_TOGGLE,
  env,
  feedbackFormConfig,
  gaTrackingId,
  readrCmsApiUrl,
  siteUrl,
  urlOfJsonForlandingPage,
}
