const GCP_PROJECT_ID = 'mirrorlearning-161006'
const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

const FIREBASE_CLIENT_EMAIL =
  process.env.FIREBASE_CLIENT_EMAIL || 'admin-sdk-service-account-keys'
const FIREBASE_PRIVATE_KEY =
  process.env.FIREBASE_PRIVATE_KEY || 'admin-sdk-service-account-keys'

let API_ORIGIN = ''
let STATIC_FILE_ORIGIN = ''
let FIREBASE_DOMAIN = ''
let FIREBASE_CONFIG = {
  API_KEY: '',
  AUTH_DOMAIN: '',
  PROJECT_ID: '',
  STORAGE_BUCKET: '',
  MESSAGING_SENDER_ID: '',
  APP_ID: '',
}

switch (ENV) {
  case 'local':
    API_ORIGIN = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-dev'
    FIREBASE_DOMAIN = 'readr-dev-38eec.firebaseapp.com'
    FIREBASE_CONFIG = {
      API_KEY: 'AIzaSyBO495WVBDY8cGfuHmpThZxKFgiipRlILs',
      AUTH_DOMAIN: 'localhost:3000',
      PROJECT_ID: 'readr-dev-38eec',
      STORAGE_BUCKET: 'readr-dev-38eec.appspot.com',
      MESSAGING_SENDER_ID: '611179505112',
      APP_ID: '1:611179505112:web:91b52854e9136ad4a83ead',
    }
    break
  case 'dev':
    API_ORIGIN = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-dev'
    FIREBASE_DOMAIN = 'readr-dev-38eec.firebaseapp.com'
    FIREBASE_CONFIG = {
      API_KEY: 'AIzaSyBO495WVBDY8cGfuHmpThZxKFgiipRlILs',
      AUTH_DOMAIN: 'sachel-mesh-dev-4g6paft7cq-de.a.run.app',
      PROJECT_ID: 'readr-dev-38eec',
      STORAGE_BUCKET: 'readr-dev-38eec.appspot.com',
      MESSAGING_SENDER_ID: '611179505112',
      APP_ID: '1:611179505112:web:91b52854e9136ad4a83ead',
    }
    break

  default:
    break
}

const GQL_ENDPOINT = `${API_ORIGIN}/gql`
const RESTFUL_ENDPOINTS = {
  latestStories: `${API_ORIGIN}/latest_stories`,
  pubsub: `${API_ORIGIN}/pubsub`,
  relatedStories: `${API_ORIGIN}/search/`,
}

const STATIC_FILE_ENDPOINTS = {
  mostFollowers: `${STATIC_FILE_ORIGIN}/data/most_followers.json`,
  mostPickStoriesInCategoryFn: (categoryName: string) =>
    `${STATIC_FILE_ORIGIN}/data/most_read_stories_${categoryName}.json`,
  mostSponsorPublishers: `${STATIC_FILE_ORIGIN}/data/most_sponsor_publishers.json`,
}

export {
  ENV,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CONFIG,
  FIREBASE_DOMAIN,
  FIREBASE_PRIVATE_KEY,
  GCP_PROJECT_ID,
  GQL_ENDPOINT,
  RESTFUL_ENDPOINTS,
  STATIC_FILE_ENDPOINTS,
}
