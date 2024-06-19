const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

export const API_URLS = {
  mostFollowers:
    'https://storage.googleapis.com/statics-mesh-tw-dev/data/most_followers.json',
} as const

let API_ENDPOINT = ''

switch (ENV) {
  case 'local':
    API_ENDPOINT = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app/gql'
    break
  case 'dev':
    API_ENDPOINT = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app/gql'
    break

  default:
    break
}

export { API_ENDPOINT, ENV }
