const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

let API_ORIGIN = ''
let STATIC_FILE_ORIGIN = ''

switch (ENV) {
  case 'local':
    API_ORIGIN = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-dev'
    break
  case 'dev':
    API_ORIGIN = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app'
    STATIC_FILE_ORIGIN = 'https://storage.googleapis.com/statics-mesh-tw-dev'
    break

  default:
    break
}

const GQL_ENDPOINT = `${API_ORIGIN}/gql`
const RESTFUL_ENDPOINTS = {
  latestStories: `${API_ORIGIN}/latest_stories`,
  pubsub: `${API_ORIGIN}/pubsub`,
}
const STATIC_FILE_URLS = {
  mostFollowers: `${STATIC_FILE_ORIGIN}/data/most_followers.json`,
}

export { ENV, GQL_ENDPOINT, RESTFUL_ENDPOINTS, STATIC_FILE_URLS }
