# Politics Tracker (政見追蹤平台)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

- - -

## Project Directory Explanation (專案目錄結構說明)
```
/                       - 根目錄
  /components           - React 元件
    /icons              - SVG icon 類型的 React 元件
    /layout             - 頁面布局元件
    /*                  - 單一頁面與其相關的元件，會放置在以頁面為名稱的子資料夾底下
    *                   - 共用類型的元件會放在 components/ 底下
  /pages                - 頁面檔
    /api                - 後端 API
  /constants            - 常數、設定
  /styles               - CSS 檔案
  /types                - TypeScript 使用的型別定義
  /utils                - 工具類 function
  /graphql              - GraphQL query/mutation
    /query              - query
    /mutation           - mutation
  /assets               - SVG、靜態檔案
  /public               - 公開資源
```

- - -

## Environment Variables (環境變數)
## Environment Variables
| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| --- | --- | --- | --- |
| ENV | 字串 | '' | 環境設定 |
| NEXT_PUBLIC_SITE_URL | 字串 | '' | 網站網址 |
| NEXT_PUBLIC_CMS_API_URL | 字串 | '' | 後端 CMS GraphQL API 呼叫端點資訊 |
| NEXT_Readr_CMS_API_URL | 字串 | '' | 後端 Readr CMS GraphQL API 呼叫端點資訊(用於landing頁的"相關報導") |
| GOOGLE_ANALYTICS_TRACKING_ID | 字串 | '' | Google Analytics Tracking ID |
| URL_OF_JSON_FOR_LANDING_PAGE | 字串 | '' | landing 頁所需的資料來源 |
| FEEDBACK_FORM_CONFIG | JSON 字串 | '' | 使用者回饋表單的設定資訊 |

## Feature Toggle (功能開關，暫時性)
| 變數名稱 | 資料型態 | 初始值 | 變數說明 |
| --- | --- | --- | --- |


環境變數設定與使用請參閱： [Basic Features: Environment Variables | Next.js](https://nextjs.org/docs/basic-features/environment-variables)