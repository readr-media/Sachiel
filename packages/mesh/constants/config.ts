import { optimism, optimismSepolia } from '@alchemy/aa-core'
import { type Chain, type Hex } from 'viem'

const GCP_PROJECT_ID = 'mirrorlearning-161006'
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

const FIREBASE_CLIENT_EMAIL =
  process.env.FIREBASE_CLIENT_EMAIL || 'admin-sdk-service-account-keys'
const FIREBASE_PRIVATE_KEY =
  process.env.FIREBASE_PRIVATE_KEY || 'admin-sdk-service-account-keys'

let API_ORIGIN = ''
let STATIC_FILE_ORIGIN = ''
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
  paymaster: Hex
} = {
  policyId: '',
  meshPoint: '0x',
  paymaster: '0x',
}

switch (ENV) {
  case 'local':
    API_ORIGIN = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-dev'
    PAYMENT_ORIGIN = 'https://mesh-payment-chain-dev-4g6paft7cq-de.a.run.app'
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
      policyId: '12056106-f884-42d2-9d43-5a8b3aca7a4e',
      meshPoint: '0xe00473f0236D2a23796C71b3678833a821bFab95',
      paymaster: '0xA75a88cdBa15725EcD1134A73d1Dda02186493De',
    }
    break
  case 'dev':
    API_ORIGIN = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-dev'
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
      policyId: '12056106-f884-42d2-9d43-5a8b3aca7a4e',
      meshPoint: '0xe00473f0236D2a23796C71b3678833a821bFab95',
      paymaster: '0xA75a88cdBa15725EcD1134A73d1Dda02186493De',
    }
    break

  case 'prod':
    PAYMENT_CHAIN = optimism
    break

  default:
    break
}

const GQL_ENDPOINT = `${API_ORIGIN}/gql`
const RESTFUL_ENDPOINTS = {
  latestStories: `${API_ORIGIN}/latest_stories`,
  pubsub: `${API_ORIGIN}/pubsub`,
  relatedStories: `${API_ORIGIN}/search/`,
  accessToken: `${API_ORIGIN}/accesstoken`,
  paymentBalance: `${PAYMENT_ORIGIN}/balance/`,
  socialPage: `${API_ORIGIN}/socialpage`,
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
}

export {
  ALCHEMY_ADDRESS,
  ENV,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CONFIG,
  FIREBASE_DOMAIN,
  FIREBASE_PRIVATE_KEY,
  GCP_PROJECT_ID,
  GQL_ENDPOINT,
  PAYMENT_CHAIN,
  RESTFUL_ENDPOINTS,
  STATIC_FILE_ENDPOINTS,
}
