const envList: string[] = ['dev', 'prod']
const env: string = envList.includes(String(process.env.ENV))
  ? String(process.env.ENV)
  : 'localhost'

// environment independent
const cmsApiUrl: string = process.env.NEXT_PUBLIC_CMS_API_URL ?? ''
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
switch (env) {
  case 'dev':
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    urlOfJsonForlandingPage = process.env.URL_OF_JSON_FOR_LANDING_PAGE ?? ''
    siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? 'https://whoareyou-dev.readr.tw'
    break
  case 'prod': {
    gaTrackingId = process.env.GOOGLE_ANALYTICS_TRACKING_ID ?? 'UA-83609754-1'
    urlOfJsonForlandingPage = process.env.URL_OF_JSON_FOR_LANDING_PAGE ?? ''
    siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://whoareyou.readr.tw'
    break
  }
  default:
    siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    break
}

export {
  env,
  siteUrl,
  cmsApiUrl,
  gaTrackingId,
  urlOfJsonForlandingPage,
  feedbackFormConfig,
}
