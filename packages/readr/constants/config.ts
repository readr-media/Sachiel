const ENV = process.env.NEXT_PUBLIC_ENV || 'local'

// 這裡管理的是在 runtime 時，可被設定的環境變數 (通常沒有 `NEXT_PUBLIC_` 作為開頭)
const USE_MOCK_SERVER = (process.env.USE_MOCK_SERVER ?? 'false') === 'true'
const MOCK_API_SERVER_PORT = Number(process.env.MOCK_API_SERVER_PORT ?? 4000)
const MISO_API_KEY = 'IHtn9b9tfPsO1EQpGV74OMf2syhELb6XVZe8u9FT'

// Google OAuth Client
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID ?? ''
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET ?? ''
const OAUTH_REDIRECT_URIS = (process.env.OAUTH_REDIRECT_URIS ?? '').split(',')
let OAUTH_REFRESH_TOKEN: Record<string, unknown>
try {
  OAUTH_REFRESH_TOKEN = JSON.parse(process.env.OAUTH_REFRESH_TOKEN ?? '{}')
} catch (err) {
  console.error(err)
}

let API_ENDPOINT = ''
let EDITOOLS_API_ENDPOINT = ''

switch (ENV) {
  case 'prod':
    API_ENDPOINT = 'https://readr-gql-prod-4g6paft7cq-de.a.run.app/api/graphql'
    EDITOOLS_API_ENDPOINT =
      'https://editools-gql-prod-4g6paft7cq-de.a.run.app/api/graphql'
    break
  case 'staging':
    API_ENDPOINT =
      'https://readr-gql-staging-4g6paft7cq-de.a.run.app/api/graphql'
    EDITOOLS_API_ENDPOINT =
      'https://editools-gql-prod-4g6paft7cq-de.a.run.app/api/graphql'
    break
  case 'dev':
  default:
    API_ENDPOINT = 'https://readr-gql-dev-4g6paft7cq-de.a.run.app/api/graphql'
    EDITOOLS_API_ENDPOINT =
      'https://editools-gql-prod-4g6paft7cq-de.a.run.app/api/graphql'
    break
}

if (USE_MOCK_SERVER) API_ENDPOINT = `http://localhost:${MOCK_API_SERVER_PORT}/`

export {
  API_ENDPOINT,
  EDITOOLS_API_ENDPOINT,
  MISO_API_KEY,
  MOCK_API_SERVER_PORT,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URIS,
  OAUTH_REFRESH_TOKEN,
}
