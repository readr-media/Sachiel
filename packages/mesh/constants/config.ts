const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

let API_ENDPOINT = ''

switch (ENV) {
  case 'local':
    API_ENDPOINT = 'https://mesh-gql-dev-4g6paft7cq-de.a.run.app/api/graphql'
    break
  case 'dev':
    // use tv-cms api url for testing only
    API_ENDPOINT = 'https://api-dev.mnews.tw/admin/api'
    break

  default:
    break
}

export { API_ENDPOINT, ENV }
