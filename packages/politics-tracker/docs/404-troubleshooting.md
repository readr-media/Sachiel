# 首頁 404 排查與 Load Balancer 轉址

## 可能原因

1. **請求沒進到 Next.js**
   - 網域 `2024election.readr.tw` 若前面有 **Load Balancer**，可能只把部分路徑轉到 Cloud Run，根路徑 `/` 被送到別的 backend（或預設 404）。
   - 這樣的話，我們在 app 裡加的 `pages/index.tsx` 永遠不會被執行。

2. **路徑對應**
   - LB 的 URL map 可能只轉發例如 `/2024`、`/politics-tracker` 等，沒有把 `/` 轉給 politics-tracker 服務。

3. **快取**
   - CDN / LB 快取了 404，需清快取或等過期。

---

## 建議作法

### 1. 先確認請求有沒有進到 Cloud Run

用 **Cloud Run 的直連網址**（例如 `https://politics-tracker-xxxxx-as.a.run.app/`）測：

- 若直連 `https://...run.app/` **會 307 轉到 /2024** → 代表 app 正常，問題在 **網域/LB 那一層**。
- 若直連也是 404 → 再檢查 build 是否有包進 `pages/index.tsx`、或 deploy 的 image 是否最新。

### 2. 在 Load Balancer 做根路徑轉址（推薦）

若確認是 LB 沒把 `/` 轉給 Cloud Run，可以在 **GCP HTTP(S) Load Balancer** 加一筆「根路徑轉址」：

- **主機與路徑規則**裡，為 `2024election.readr.tw` 新增一筆：
  - 路徑：`/`（或只勾選「完全符合」的根路徑，依你用的介面而定）
  - 動作：**重新導向**
  - 重新導向類型：**301 或 302**
  - 目標：`https://2024election.readr.tw/2024`

這樣使用者一打 `https://2024election.readr.tw/` 就會被轉到 `/2024`，不依賴 Next.js 是否收到請求。

### 3. 確認 LB 有把根路徑轉給 Cloud Run

若你希望由 Next.js 處理 `/`（用我們寫的 307 轉址），就要確認：

- 主機 `2024election.readr.tw` 的 **預設後端**（或涵蓋 `/` 的路徑規則）是指到 **同一個 Cloud Run 服務**（politics-tracker），而不是別的 backend 或 404 頁面。

---

## 小結

| 狀況 | 建議 |
|------|------|
| Cloud Run 直連 `/` 會 307 → /2024 | 在 **Load Balancer** 加一筆 `/` → 重新導向到 `/2024` |
| Cloud Run 直連 `/` 也是 404 | 檢查 build/deploy 是否包含 `pages/index.tsx`、image 是否為最新 |
| 不確定請求有沒有進 Cloud Run | 先看 LB / 網域對應，確認 `/` 有指到 politics-tracker 的 Cloud Run 服務 |

若你提供目前 LB 的設定方式（主機/路徑規則截圖或 YAML），可以再幫你對應成具體操作步驟。
