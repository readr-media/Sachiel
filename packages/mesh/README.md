# Readr Mesh (Mesh 網頁版)

## 專案文件

請見此[連結](https://paper.dropbox.com/doc/Mesh-web--CN515jE0ePXc~Y7e4U7wpFPqAg-IKnh8OyzeYAa988YljLX2)。

## i18n

#### 使用 react-i18next 套件 + custom hook

基於頁面含有登入才能瀏覽和非登入即可瀏覽的頁面，後者被設定為靜態頁面導致 server side 無法存取 `cookies()`, `headers()` 等 api 來辨別使用者訊息，因此在 i18n 的設定上全面使用 react-i18next `useTranslation` 來設定 **純 client side** 多國語的功能，然而 client componet 在 server side 先執行一次以產生 html 讓 client side 去執行 hydration，因為 `useTranslation` 在 server side 無法如期使用導致會產生 server side gen 出來的多國語字串會以 key 的方式呈現 (像是 `Pages.Home.DailyHighlight-title`)，所以另外設計了 `useCustomTranslation`，推遲 `useTranslation` 翻譯時間到 useEffect 執行之後，避免 hydration error 造成的問題，使用方式如下：

```typescript
'use client'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

export default function SomeClientComponet({
  categoryTitle,
}: {
  categoryTitle: string
}) {
  const { t } = useCustomTranslation()

  return (
    <h1>
      {t('Pages.Subpage.SubpageLayout-title', '{{title}}熱門', {
        title: categoryTitle,
      })}
    </h1>
  )
}
```

`useCustomTranslation` 使用方式同 `useTranslation`，差別在只在於在 server side 和初始化的 client side 會直接使用 default 值(第二個參數，可能搭配第三個參數組成最後的 default 值) 來顯示，直到 `useEffect` 後才會改回真正的翻譯字串

**注意**： 多國語字串只能放在 client component 中，如果 server component 有需要顯示字串的部分需另外放到 client component 中

#### 更新 i18n 字串

後續開發時如果有新的字串需要翻成多國語，需操作以下步驟

1. 使用 `useCustomTranslation` 並將設計稿或是 Spec 提供的字串放到第二個參數，同時在[翻譯檔](https://docs.google.com/spreadsheets/d/1-ZgOzjxv7eFO6l0JzKdnaU9B4_REzwVfASJNGPO0_9o/edit?gid=0#gid=0)中更新字串表，**請拉到最下方新增一列來處理**，並在該次功能開發到一個段落後告知 PM 進行翻譯
2. 等 PM 翻譯
3. 翻譯完成後執行 i18n script，請參考 [script/i18n/](./script/i18n/) 中的 README.md 來操作後續步驟
