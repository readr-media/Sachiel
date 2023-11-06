// 這裡管理的是在 runtime 時，可被設定的環境變數 (通常沒有 `NEXT_PUBLIC_` 作為開頭)
import type { FeedbackFormConfig } from '~/types/common'

const cmsApiUrl: string = process.env.CMS_API_URL ?? ''
const readrCmsApiUrl: string = process.env.READR_CMS_API_URL ?? ''
const urlOfJsonForlandingPage = process.env.URL_OF_JSON_FOR_LANDING_PAGE ?? ''

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

export {
  cmsApiUrl,
  feedbackFormConfig,
  readrCmsApiUrl,
  urlOfJsonForlandingPage,
}
