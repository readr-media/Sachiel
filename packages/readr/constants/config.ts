// 這裡管理的是在 runtime 時，可被設定的環境變數 (通常沒有 `NEXT_PUBLIC_` 作為開頭)
const API_ENDPOINT = process.env.API_ENDPOINT ?? 'http://localhost:4000/'

export { API_ENDPOINT }
