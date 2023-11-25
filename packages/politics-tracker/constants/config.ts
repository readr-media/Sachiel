// 這裡管理的是在 runtime 時，可被設定的環境變數 (通常沒有 `NEXT_PUBLIC_` 作為開頭)
import type { FeedbackFormConfig } from '~/types/common'

const cmsApiUrl: string = process.env.CMS_API_URL ?? ''
const readrCmsApiUrl: string = process.env.READR_CMS_API_URL ?? ''
const urlOfJsonForlandingPage = process.env.URL_OF_JSON_FOR_LANDING_PAGE ?? ''
const ProgrammableSearchEngineID =
  process.env.PROGRAMABLE_SEARCH_ENGINE_ID ?? 'SEARCH_ENGINE_ID'
const ProgrammableSearchAPIKey =
  process.env.PROGRAMABLE_SEARCH_API_KEY ?? 'SEARCH_API_KEY'

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
  ProgrammableSearchAPIKey,
  ProgrammableSearchEngineID,
  readrCmsApiUrl,
  urlOfJsonForlandingPage,
}
