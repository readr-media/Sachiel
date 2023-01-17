# READr

## 使用教學
### 開發與測試
1. 建立 `.env.local` 檔案，並參考[環境變數](#environment-variables-環境變數)和[功能開關](#feature-toggle-功能開關暫時性)資訊進行設定，設定方式參考[文件](https://nextjs.org/docs/basic-features/environment-variables)
2. 使用 `yarn install` 安裝環境依賴。
3. 安裝完畢後，使用 `yarn run mock-server` 來啟動 mock GraphQL API server，作為本地端開發使用。
4. 接著，使用 `yarn dev` 啟動服務，進行開發測試。
5. 開發完畢後，使用 `yarn build` 來建構正式環境程式，然後再使用 `yarn start` 來執行並驗證。

### 更新 mock GraphQL API server 的 schema
* 在目標 DB 的 schema 更新後，將新版的 [schema.graphql](https://github.com/mirror-media/Lilith/blob/main/packages/readr/schema.graphql) 檔案複製到 `mock-server/typeDefs/` 底下，覆蓋既有 `schema.graphql`，然後重開 mock server 即可。


- - -
## Project Directory Explanation (專案目錄結構說明)
```
|── components/       - React 元件，共用類型的元件
|   |── layout/       - 頁面布局元件
|   └── */            - 單一頁面與其相關的元件，會放置在以頁面為名稱的子資料夾底下
|── pages/            - 頁面檔
|   └── api/          - 後端 API
|── constants/        - 常數、設定
|── styles/           - CSS 檔案、theme
|── types/            - TypeScript 使用的型別定義
|── utils/            - 工具類 function
|── graphql/          - GraphQL query/mutation
|   |── query/        - query
|   └── mutation/     - mutation
|── public/           - 靜態資源
|   |── icons/        - SVG icons
|   └── images/       - 圖片
└── mock-server/      - mock GraphQL API server
    └── typeDefs/     - GraphQL schema 檔案
```

- - -

## Environment Variables (環境變數)
| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| --- | --- | --- | --- |
| NEXT_PUBLIC_ENV | 字串 | 'localhost' | 環境設定 |
| MOCK_API_SERVER_PORT | 整數 | '4000' | mock GraphQL API server 所使用的 port |
| API_ENDPOINT | 字串 | 'http://localhost:4000/' | GraphQL API 端點 |

## Feature Toggle (功能開關，暫時性)
| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| --- | --- | --- | --- |


環境變數設定與使用請參閱： [Basic Features: Environment Variables | Next.js](https://nextjs.org/docs/basic-features/environment-variables)

- - -
## 部屬
目前採用 Cloud Build 進行自動化部署，共有 dev、staging、prod 三個分支，須以發 PR 的方式合併分支。

當功能已在 feature branch 開發完畢，即可發 PR 並 merge 進 dev 分支，便會觸發自動化部署並更新測試機。 若要將專案推到正式機，須與 PM（產品經理）確認，再從 dev 分支發 PR merge到 staging 分支，確認 staging 功能正常後，接著再發 PR 至 prod 分支。其中，正式機的部署目前需要手動核准。

- - -
## 部屬環境資訊
### Dev
* [Cloud Build | sachiel-readr-dev](https://console.cloud.google.com/cloud-build/triggers;region=global/edit/7029a598-d081-4cac-a86a-108c6898ad8a?project=mirrorlearning-161006)
* [Cloud Run | readr-next-dev](https://console.cloud.google.com/run/detail/asia-east1/readr-next-dev/metrics?project=mirrorlearning-161006)

### Staging
* [Cloud Build | ]()
* [Cloud Run | ]()

### Prod
* [Cloud Build | ]()
* [Cloud Run | ]()