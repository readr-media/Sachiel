import type { FeedbackFormConfig } from '~/types/common'

const envList: string[] = ['dev', 'prod']
const env: string = envList.includes(String(process.env.NEXT_PUBLIC_ENV))
  ? String(process.env.NEXT_PUBLIC_ENV)
  : 'localhost'

// environment independent
const cmsApiUrl: string = process.env.CMS_API_URL ?? ''
const readrCmsApiUrl: string = process.env.READR_CMS_API_URL ?? ''
const urlOfJsonForlandingPage = process.env.URL_OF_JSON_FOR_LANDING_PAGE ?? ''
const prefixOfJSONForLanding2024Test: string =
  process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ?? ''

let feedbackFormConfig: FeedbackFormConfig
try {
  feedbackFormConfig = JSON.parse(process.env.FEEDBACK_FORM_CONFIG ?? '')
} catch (e) {
  feedbackFormConfig = {
    emoji: {
      formId: '',
      fieldId: '',
    },
    text: {
      formId: '',
      fieldId: '',
    },
  }
}

// environment dependent
let siteUrl: string
let gaTrackingId: string
let prefixOfJSONForLanding2024: string

switch (env) {
  case 'dev':
    gaTrackingId =
      process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'test-UA-83609754-1'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs-dev.readr.tw/json'
    siteUrl = process.env.SITE_URL ?? 'https://whoareyou-dev.readr.tw'
    break
  case 'prod': {
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs-prod.readr.tw/json'
    siteUrl = process.env.SITE_URL ?? 'https://whoareyou.readr.tw'
    break
  }
  default:
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'test'
    prefixOfJSONForLanding2024 =
      process.env.NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 ??
      'https://whoru-gcs-dev.readr.tw/json'
    siteUrl = process.env.SITE_URL ?? 'http://localhost:3000'
    break
}

export {
  cmsApiUrl,
  env,
  feedbackFormConfig,
  gaTrackingId,
  prefixOfJSONForLanding2024,
  prefixOfJSONForLanding2024Test,
  readrCmsApiUrl,
  siteUrl,
  urlOfJsonForlandingPage,
}
