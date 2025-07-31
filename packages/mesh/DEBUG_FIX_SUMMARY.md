# Media Page 分類切換問題修復總結

## 問題描述
在使用者登入後，還沒有 local storage 的內容時，點選 media page 的第一個分類 tab 時會透過 api 去拿到資料，但是當切換其他分類 tab 時就沒有去打 api，於是出現沒有內容的狀態。

## 問題根源
問題出現在 `setSearchParams` 函數的實現上。該函數使用 `window.history.pushState` 來改變 URL，但這種方式不會觸發 Next.js 的路由變化，因此 `useSearchParams` hook 不會檢測到 URL 的變化，導致組件不會重新渲染和加載數據。

## 修復方案

### 1. 新增 `setSearchParamsWithRouter` 函數
在 `utils/search-params.ts` 中新增了一個新的函數：

```typescript
export function setSearchParamsWithRouter(
  router: any,
  paramName: string,
  paramValue: string
) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.set(paramName, paramValue)
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`
  router.push(newUrl, { scroll: false })
}
```

這個函數使用 Next.js 的 `router.push` 方法來更新 URL，確保 `useSearchParams` hook 能夠檢測到變化。

### 2. 修改 `category-selector.tsx`
- 導入 `useRouter` hook
- 將 `setSearchParams` 替換為 `setSearchParamsWithRouter`
- 在分類切換時傳入 router 實例

### 3. 修改 `nav-list.tsx`
- 導入 `useRouter` hook
- 將 `setSearchParams` 替換為 `setSearchParamsWithRouter`
- 修復了 useEffect 的使用錯誤

## 修復的文件
1. `utils/search-params.ts` - 新增 `setSearchParamsWithRouter` 函數
2. `app/media/_components/category-selector.tsx` - 使用新的路由函數
3. `app/_components/category-story/nav-list.tsx` - 使用新的路由函數

## 測試建議
1. 登入應用程序
2. 進入 media page
3. 點擊第一個分類 tab，確認數據正常加載
4. 切換到其他分類 tab，確認數據也能正常加載
5. 檢查瀏覽器開發者工具的 Network 標籤，確認 API 請求正常發送

## 注意事項
- 原有的 `setSearchParams` 函數保持不變，以確保向後兼容性
- 新的 `setSearchParamsWithRouter` 函數專門用於需要觸發組件重新渲染的場景
- 修復不會影響其他使用 `setSearchParams` 的功能 