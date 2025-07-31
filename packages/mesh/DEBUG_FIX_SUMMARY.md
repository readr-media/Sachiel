# Media Page 分類切換問題修復總結

## 問題描述
在使用者登入後，還沒有 local storage 的內容時，點選 media page 的第一個分類 tab 時會透過 api 去拿到資料，但是當切換其他分類 tab 時就沒有去打 api，於是出現沒有內容的狀態。

**更新：** 直接訪問帶有分類參數的 URL（如 `media?c=politics`）時，也沒有正確加載最新數據。

## 問題根源

### 問題 1：分類切換不觸發 API 調用
問題出現在 `setSearchParams` 函數的實現上。該函數使用 `window.history.pushState` 來改變 URL，但這種方式不會觸發 Next.js 的路由變化，因此 `useSearchParams` hook 不會檢測到 URL 的變化，導致組件不會重新渲染和加載數據。

### 問題 2：直接訪問 URL 不加載數據
當用戶直接訪問 `media?c=politics` 這樣的 URL 時，Effect 1 和 Effect 3 的邏輯存在問題：
- Effect 1 檢查數據時沒有正確驗證數據是否真正加載
- Effect 3 對於初始分類會提前退出，不處理數據加載

### 問題 3：TypeScript 錯誤和構建問題
- TypeScript 錯誤：`pageDataInCategories` 可能為 null
- ESLint 錯誤：找不到 prettier.config 模組（在 Docker 構建環境中）
- ESLint 格式化錯誤：prettier 格式化問題
- React Hooks 依賴項警告

## 修復方案

### 1. 新增 `setSearchParamsWithRouter` 函數
在 `utils/search-params.ts` 中新增了一個新的函數：

```typescript
export function setSearchParamsWithRouter(
  router: { push: (url: string, options?: { scroll?: boolean }) => void },
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
- 修復 prettier 格式化問題

### 3. 修改 `nav-list.tsx`
- 導入 `useRouter` hook
- 將 `setSearchParams` 替換為 `setSearchParamsWithRouter`
- 修復了 useEffect 的使用錯誤
- 修復 prettier 格式化問題

### 4. 修復 Effect 1 的數據檢查邏輯
在 `media-stories.tsx` 中修改 Effect 1：
- 添加更詳細的日誌來追蹤數據檢查過程
- 使用 `isCategoryDataLoaded` 函數來正確驗證數據是否真正加載
- 改進錯誤處理邏輯

### 5. 修復 Effect 3 的初始分類處理
在 `media-stories.tsx` 中修改 Effect 3：
- 不再對初始分類提前退出
- 檢查 Effect 1 是否已經正確處理了初始分類
- 如果 Effect 1 沒有正確處理，則在 Effect 3 中處理

### 6. 修復 TypeScript 錯誤
在 `media-stories.tsx` 中：
- 使用可選鏈操作符 `?.` 來安全訪問 `pageDataInCategories`
- 確保所有對 `pageDataInCategories` 的訪問都是安全的

### 7. 修復 prettier 配置問題
在 `prettier.config.js` 中：
- 添加 try-catch 塊來處理共享配置可能不存在的情況
- 提供 fallback 配置，確保在 Docker 構建環境中也能正常工作

### 8. 修復 React Hooks 依賴項警告
在 `media-stories.tsx` 中：
- 將 `isCategoryDataLoaded` 函數包裝在 `useCallback` 中
- 移除不必要的依賴項 `latestStoriesInfo.totalCount`
- 修復 useEffect 依賴項問題

### 9. 修復 ESLint 格式化問題
- 使用 ESLint 的 `--fix` 選項自動修復格式化問題
- 修復 import 語句的格式化
- 修復函數調用的格式化

## 修復的文件
1. `utils/search-params.ts` - 新增 `setSearchParamsWithRouter` 函數，修復 TypeScript 類型
2. `app/media/_components/category-selector.tsx` - 使用新的路由函數，修復格式化
3. `app/_components/category-story/nav-list.tsx` - 使用新的路由函數，修復格式化
4. `app/media/_components/media-stories.tsx` - 修復 Effect 1 和 Effect 3 的邏輯，修復 TypeScript 錯誤，修復 React Hooks 依賴項
5. `prettier.config.js` - 修復 Docker 構建環境中的配置問題

## 測試建議
1. 登入應用程序
2. 進入 media page
3. 點擊第一個分類 tab，確認數據正常加載
4. 切換到其他分類 tab，確認數據也能正常加載
5. 直接訪問 `media?c=politics` 這樣的 URL，確認數據正常加載
6. 檢查瀏覽器開發者工具的 Network 標籤，確認 API 請求正常發送
7. 檢查瀏覽器控制台的日誌，確認 Effect 1 和 Effect 3 正確執行
8. 運行 `npm run type` 確認沒有 TypeScript 錯誤
9. 運行 `npx eslint` 確認沒有 ESLint 錯誤
10. 測試 Docker 構建是否成功

## 注意事項
- 原有的 `setSearchParams` 函數保持不變，以確保向後兼容性
- 新的 `setSearchParamsWithRouter` 函數專門用於需要觸發組件重新渲染的場景
- 修復不會影響其他使用 `setSearchParams` 的功能
- 添加了更詳細的日誌來幫助調試未來的問題
- 所有對可能為 null 的對象的訪問都使用了安全的方式
- prettier 配置現在在 Docker 構建環境中也能正常工作
- React Hooks 依賴項已經正確配置，避免不必要的重新渲染
- 保留了 console.error 語句用於錯誤調試，但移除了 console.log 語句 