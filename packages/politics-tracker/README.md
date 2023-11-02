# Politics Tracker (政見追蹤平台)

## 使用教學

1. 建立 `.env.local` 檔案，並參考[環境變數](#environment-variables-環境變數)和[功能開關](#feature-toggle-功能開關暫時性)資訊進行設定，設定方式參考[文件](https://nextjs.org/docs/basic-features/environment-variables)
2. 使用 `yarn install` 安裝環境依賴。
3. 安裝完畢後，使用 `yarn dev` 啟動服務，進行開發測試。
4. 開發完畢後，使用 `yarn build` 來建構正式環境程式，然後再使用 `yarn start` 來執行並驗證。

---

## Project Directory Explanation (專案目錄結構說明)

```
|── components/       - React 元件，共用類型的元件
|   |── icons/        - SVG icon 類型的 React 元件
|   |── layout/       - 頁面布局元件
|   └── */            - 單一頁面與其相關的元件，會放置在以頁面為名稱的子資料夾底下
|── pages/            - 頁面檔
|   └── api/          - 後端 API
|── constants/        - 常數、設定
|── styles/           - CSS 檔案
|── types/            - TypeScript 使用的型別定義
|── utils/            - 工具類 function
|── graphql/          - GraphQL query/mutation
|   |── query/        - query
|   └── mutation/     - mutation
└── public/           - SVG、靜態檔案
```

---

## Environment Variables (環境變數)

| 變數名稱                                    | 資料型態  | 初始值                                | 變數說明                                                             |
| ------------------------------------------- | --------- | ------------------------------------- | -------------------------------------------------------------------- |
| NEXT_PUBLIC_ENV                             | 字串      | 'localhost'                           | 環境設定                                                             |
| NEXT_PUBLIC_SITE_URL                        | 字串      | 'http://localhost:3000'               | 網站網址                                                             |
| NEXT_PUBLIC_GOOGLE_ANALYTICS_TRACKING_ID    | 字串      | 'UA-83609754-1'                       | Google Analytics Tracking ID                                         |
| NEXT_PUBLIC_PREFIX_OF_JSON_FOR_LANDING_2024 | 字串      | 'https://whoru-gcs-dev.readr.tw/json' | landing(page/2024) 頁所需的 JSON 前綴                                |
| CMS_API_URL                                 | 字串      | ''                                    | 後端 CMS GraphQL API 呼叫端點資訊                                    |
| READR_CMS_API_URL                           | 字串      | ''                                    | 後端 Readr CMS GraphQL API 呼叫端點資訊(用於 landing 頁的"相關報導") |
| URL_OF_JSON_FOR_LANDING_PAGE                | 字串      | ''                                    | landing(page/2022) 頁所需的資料來源                                  |
| FEEDBACK_FORM_CONFIG                        | JSON 字串 | ''                                    | 使用者回饋表單的設定資訊                                             |

## Feature Toggle (功能開關，暫時性)

| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| -------- | -------- | ------ | -------- |

環境變數設定與使用請參閱： [Basic Features: Environment Variables | Next.js](https://nextjs.org/docs/basic-features/environment-variables)

---

## 部屬

目前採用 Cloud Build 進行自動化建構與部署，共有 dev、staging 和 prod 三個分支，須以發 PR 的方式合併分支。

當功能已在 feature branch 開發完畢，即可發 PR 並 merge 進 dev 分支，便會觸發 Cloud Build 並更新測試機。 若要將專案推到正式機，須與 PM（產品經理）確認，再從 dev 分支發 PR merge 到 staging 分支，接著，staging 再發 PR 至 prod 分支。

**在本專案中，部屬的環境僅有 dev 和 prod 環境，但在從 dev 更新到 prod 的過程中，不可以跳過 staging。**

---

## 部屬環境資訊

### Dev

- [Cloud Build | sachiel-openrelationship-dev](https://console.cloud.google.com/cloud-build/triggers;region=global/edit/af5072d3-fb16-4b27-96c8-6c60cbe2323e?project=mirrorlearning-161006)
- [Cloud Run | politics-tracker-dev](https://console.cloud.google.com/run/detail/asia-east1/politics-tracker-dev/metrics?project=mirrorlearning-161006)

### Prod

- [Cloud Build | sachiel-openrelationship-prod](https://console.cloud.google.com/cloud-build/triggers;region=global/edit/e25a7b3f-8fa5-48db-a21d-294b002c7044?project=mirrorlearning-161006)
- [Cloud Run | openrelationship-prod](https://console.cloud.google.com/run/detail/asia-east1/openrelationship-prod/metrics?project=mirrorlearning-161006)
