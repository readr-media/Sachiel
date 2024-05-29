const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

let API_ENDPOINT = ''

switch (ENV) {
  case 'local':
  case 'dev':
    API_ENDPOINT = 'https://mesh-proxy-server-dev-4g6paft7cq-de.a.run.app/gql'
    break

  default:
    break
}

export { API_ENDPOINT, ENV }
