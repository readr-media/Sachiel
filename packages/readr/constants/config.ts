// 這裡管理的是在 runtime 時，可被設定的環境變數 (通常沒有 `NEXT_PUBLIC_` 作為開頭)
const MOCK_API_SERVER_PORT = Number(process.env.MOCK_API_SERVER_PORT ?? 4000)
const API_ENDPOINT =
  process.env.API_ENDPOINT ?? `http://localhost:${MOCK_API_SERVER_PORT}/`
const EDITOOLS_API_ENDPOINT = process.env.EDITOOLS_API_ENDPOINT ?? ''

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

export {
  API_ENDPOINT,
  EDITOOLS_API_ENDPOINT,
  MOCK_API_SERVER_PORT,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URIS,
  OAUTH_REFRESH_TOKEN,
}
