// 這裡管理的是在 runtime 時，可被設定的環境變數 (通常沒有 `NEXT_PUBLIC_` 作為開頭)
const MOCK_API_SERVER_PORT = Number(process.env.MOCK_API_SERVER_PORT ?? 4000)
const API_ENDPOINT =
  process.env.API_ENDPOINT ?? `http://localhost:${MOCK_API_SERVER_PORT}/`

export { API_ENDPOINT, MOCK_API_SERVER_PORT }
