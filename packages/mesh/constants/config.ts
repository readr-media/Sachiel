import { optimism, optimismSepolia } from '@alchemy/aa-core'
import { type Chain, type Hex } from 'viem'

const GCP_PROJECT_ID = 'mirrorlearning-161006'
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

const FIREBASE_CLIENT_EMAIL =
  process.env.FIREBASE_CLIENT_EMAIL || 'admin-sdk-service-account-keys'
const FIREBASE_PRIVATE_KEY =
  process.env.FIREBASE_PRIVATE_KEY || 'admin-sdk-service-account-keys'

let GTM_ENV = ''
let ADSENSE_CLIENT = ''
let API_ORIGIN = ''
let STATIC_FILE_ORIGIN = ''
let GCP_LOG_NAME = ''
let PAYMENT_ORIGIN = ''
let PAYMENT_CHAIN: Chain = optimismSepolia
let FIREBASE_DOMAIN = ''
let FIREBASE_CONFIG = {
  API_KEY: '',
  AUTH_DOMAIN: '',
  PROJECT_ID: '',
  STORAGE_BUCKET: '',
  MESSAGING_SENDER_ID: '',
  APP_ID: '',
}
let ALCHEMY_ADDRESS: {
  policyId: string
  meshPoint: Hex
} = {
  policyId: '',
  meshPoint: '0x',
}
let NEXT_PAGES_REVALIDATE: {
  homepage: number
  social: number
  media: number
  story: number
} = {
  homepage: 0,
  social: 0,
  media: 0,
  story: 0,
}
let SITE_HOST = ''
const SITE_TITLE = 'READr Mesh 讀選'
const SITE_DESCRIPTION =
  '在READr Mesh 讀選上瀏覽多元的新聞媒體內容。盡情精選、分享和製作新聞集錦，將你認為有意義的新聞資訊傳播出去。'

switch (ENV) {
  case 'local':
    SITE_HOST = 'localhost:3000'
    API_ORIGIN = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app'
    ADSENSE_CLIENT = 'ca-pub-9990785780499264'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-dev'
    PAYMENT_ORIGIN = 'https://mesh-payment-chain-dev-4g6paft7cq-de.a.run.app'
    GCP_LOG_NAME = 'mesh-next-userlog-local'
    PAYMENT_CHAIN = optimismSepolia
    FIREBASE_DOMAIN = 'readr-dev-38eec.firebaseapp.com'
    FIREBASE_CONFIG = {
      API_KEY: 'AIzaSyBO495WVBDY8cGfuHmpThZxKFgiipRlILs',
      AUTH_DOMAIN: 'localhost:3000',
      PROJECT_ID: 'readr-dev-38eec',
      STORAGE_BUCKET: 'readr-dev-38eec.appspot.com',
      MESSAGING_SENDER_ID: '611179505112',
      APP_ID: '1:611179505112:web:91b52854e9136ad4a83ead',
    }
    ALCHEMY_ADDRESS = {
      policyId: '2dd43a81-3e1c-4c74-aa5f-35135f24dfcd',
      meshPoint: '0xe00473f0236D2a23796C71b3678833a821bFab95',
    }
    break
  case 'dev':
    SITE_HOST = 'dev.mmesh.news'
    API_ORIGIN = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app'
    ADSENSE_CLIENT = 'ca-pub-9990785780499264'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-dev'
    GCP_LOG_NAME = 'mesh-next-userlog-dev'
    PAYMENT_ORIGIN = 'https://mesh-payment-chain-dev-4g6paft7cq-de.a.run.app'
    PAYMENT_CHAIN = optimismSepolia
    FIREBASE_DOMAIN = 'readr-dev-38eec.firebaseapp.com'
    FIREBASE_CONFIG = {
      API_KEY: 'AIzaSyBO495WVBDY8cGfuHmpThZxKFgiipRlILs',
      AUTH_DOMAIN: 'dev.mmesh.news',
      PROJECT_ID: 'readr-dev-38eec',
      STORAGE_BUCKET: 'readr-dev-38eec.appspot.com',
      MESSAGING_SENDER_ID: '611179505112',
      APP_ID: '1:611179505112:web:91b52854e9136ad4a83ead',
    }
    ALCHEMY_ADDRESS = {
      policyId: '2dd43a81-3e1c-4c74-aa5f-35135f24dfcd',
      meshPoint: '0xe00473f0236D2a23796C71b3678833a821bFab95',
    }
    NEXT_PAGES_REVALIDATE = {
      homepage: 1 * 60 * 1000,
      social: 1 * 60 * 1000,
      media: 1 * 60 * 1000,
      story: 1 * 60 * 1000,
    }
    GTM_ENV = 'GTM-MKLVHSGJ'

    break

  case 'prod':
    SITE_HOST = 'www.mmesh.news'
    API_ORIGIN =
      'https://mesh-proxy-server-prod-1075249966777.asia-east1.run.app'
    ADSENSE_CLIENT = 'ca-pub-9990785780499264'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-prod'
    GCP_LOG_NAME = 'mesh-next-userlog-prod'
    PAYMENT_ORIGIN = 'https://mesh-payment-chain-dev-4g6paft7cq-de.a.run.app'
    PAYMENT_ORIGIN =
      'https://mesh-payment-chain-prod-1075249966777.asia-east1.run.app'
    PAYMENT_CHAIN = optimism
    FIREBASE_DOMAIN = 'mesh-app.readr.tw'
    FIREBASE_CONFIG = {
      API_KEY: 'AIzaSyDna248DTK4AtPNIx6TRNjn0qtIsYX7utY',
      AUTH_DOMAIN: 'www.mmesh.news',
      PROJECT_ID: 'readr-prod',
      STORAGE_BUCKET: 'readr-prod.appspot.com',
      MESSAGING_SENDER_ID: '593370764604',
      APP_ID: '1:593370764604:web:3e90810bc5e6345ef37a39',
    }
    ALCHEMY_ADDRESS = {
      policyId: '42006380-ade7-4de4-80cc-5bdb2f87c927',
      meshPoint: '0x791dd9BcDA32483803c8417Fe38394d9a25eFD20',
    }
    NEXT_PAGES_REVALIDATE = {
      homepage: 20 * 60 * 1000,
      social: 10 * 60 * 1000,
      media: 10 * 60 * 1000,
      story: 20 * 60 * 1000,
    }
    GTM_ENV = 'GTM-WPC2M99H'

    break

  default:
    break
}
const GTM_ID = GTM_ENV
const GQL_ENDPOINT = `${API_ORIGIN}/gql`
const RESTFUL_ENDPOINTS = {
  latestStories: `${API_ORIGIN}/latest_stories`,
  pubsub: `${API_ORIGIN}/pubsub`,
  search: `${API_ORIGIN}/search`,
  accessToken: `${API_ORIGIN}/accesstoken`,
  paymentBalance: `${PAYMENT_ORIGIN}/balance/`,
  paymentCreate: `${PAYMENT_ORIGIN}/v1/payment/create`,
  paymentAuth: `${PAYMENT_ORIGIN}/v1/payment/auth`,
  socialPage: `${API_ORIGIN}/socialpage`,
  invitationCodes: `${API_ORIGIN}/invitation_codes`,
  notifications: `${API_ORIGIN}/notifications`,
}

const STATIC_FILE_ENDPOINTS = {
  mostFollowers: `${STATIC_FILE_ORIGIN}/data/most_followers.json`,
  mostPickStoriesInCategoryFn: (categoryName: string) =>
    `${STATIC_FILE_ORIGIN}/data/most_read_stories_${categoryName}.json`,
  mostSponsorPublishers: `${STATIC_FILE_ORIGIN}/data/most_recommend_sponsors.json`,
  mostReadMembers: `${STATIC_FILE_ORIGIN}/data/most_read_members.json`,
  recentReadrStory: `${STATIC_FILE_ORIGIN}/data/recent_readr_stories.json`,
  mostPopularStory: `${STATIC_FILE_ORIGIN}/data/hotpage_most_popular_story.json`,
  mostSponsorPublishersOnHomepage: `${STATIC_FILE_ORIGIN}/data/hotpage_most_sponsored_publisher.json`,
  mostLikeComments: `${STATIC_FILE_ORIGIN}/data/hotpage_most_like_comments.json`,
  dailyHighlightGroup: `${STATIC_FILE_ORIGIN}/data/hotpage_group.json`,
  dailyHighlightNoGroup: `${STATIC_FILE_ORIGIN}/data/hotpage_no_group.json`,
  groupAndOtherStoriesInCategeoryfn: (categoryName: string) =>
    `${STATIC_FILE_ORIGIN}/data/group_${categoryName}.json`,
  categoryMostSponsoredPublishersfn: (categoryName: string) =>
    `${STATIC_FILE_ORIGIN}/data/${categoryName}_recommend_sponsors.json`,
  contract: `${STATIC_FILE_ORIGIN}/contracts/MeshPoint.json`,
  publisherStoriesFn: (publisherCustomId: string) =>
    `${STATIC_FILE_ORIGIN}/data/${publisherCustomId}_stories.json`,
  invalidNameList: `${STATIC_FILE_ORIGIN}/data/invalid_names.json`,
  termsOfService: `${STATIC_FILE_ORIGIN}/policies/terms-of-service.html`,
  privacyPolicy: `${STATIC_FILE_ORIGIN}/policies/privacy-policy.html`,
}

const SITE_URL = `https://${SITE_HOST}`
const SITE_OG_IMAGE = `${SITE_URL}/images/default-og-img.png`

export {
  ADSENSE_CLIENT,
  ALCHEMY_ADDRESS,
  ENV,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CONFIG,
  FIREBASE_DOMAIN,
  FIREBASE_PRIVATE_KEY,
  GCP_LOG_NAME,
  GCP_PROJECT_ID,
  GQL_ENDPOINT,
  GTM_ID,
  NEXT_PAGES_REVALIDATE,
  PAYMENT_CHAIN,
  RESTFUL_ENDPOINTS,
  SITE_DESCRIPTION,
  SITE_HOST,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
  STATIC_FILE_ENDPOINTS,
}
