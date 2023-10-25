import type { FeedbackFormConfig } from '~/types/common'

const envList: string[] = ['dev', 'prod']
const env: string = envList.includes(String(process.env.NEXT_PUBLIC_ENV))
  ? String(process.env.NEXT_PUBLIC_ENV)
  : 'localhost'

// environment independent
const cmsApiUrl: string = process.env.CMS_API_URL ?? ''
const readrCmsApiUrl: string = process.env.READR_CMS_API_URL ?? ''

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

// environemnt dependent
let siteUrl: string
let gaTrackingId: string
let urlOfJsonForlandingPage: string
let prefixUrlForLanding2024FactCheck: string

switch (env) {
  case 'dev':
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    urlOfJsonForlandingPage =
      process.env.URL_OF_JSON_FOR_LANDING_2022_PAGE ?? ''
    prefixUrlForLanding2024FactCheck =
      process.env.PREFIX_OF_JSON_FOR_LANDING_2024_FACTCHECK ?? ''
    siteUrl = process.env.SITE_URL ?? 'https://whoareyou-dev.readr.tw'
    break
  case 'prod': {
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    urlOfJsonForlandingPage =
      process.env.URL_OF_JSON_FOR_LANDING_2022_PAGE ?? ''
    prefixUrlForLanding2024FactCheck =
      process.env.PREFIX_OF_JSON_FOR_LANDING_2024_FACTCHECK ?? ''
    siteUrl = process.env.SITE_URL ?? 'https://whoareyou.readr.tw'
    break
  }
  default:
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? ''
    urlOfJsonForlandingPage =
      process.env.URL_OF_JSON_FOR_LANDING_2022_PAGE ?? ''
    prefixUrlForLanding2024FactCheck =
      process.env.PREFIX_OF_JSON_FOR_LANDING_2024_FACTCHECK ?? ''
    siteUrl = process.env.SITE_URL ?? 'http://localhost:3000'
    break
}

export {
  cmsApiUrl,
  env,
  feedbackFormConfig,
  gaTrackingId,
  prefixUrlForLanding2024FactCheck,
  readrCmsApiUrl,
  siteUrl,
  urlOfJsonForlandingPage,
}
