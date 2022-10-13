# Toast
## 介紹
該套件提供前端頁面顯示 Toast 訊息，具備以下功能：
1. 顯示在畫面最上方，並跟隨畫面捲動一起移動
2. 有成功與失敗的樣式
3. Toast 訊息出現後，可被手動關閉
4. Toast 訊息出現後，過一段時間會自動關閉
5. 可以同時顯示多個 Toast 訊息，最新的訊息會顯示在畫面最上方

該套件使用 Context API 與 Portal 來實現功能。

## 使用說明

上層元件先注入 `context`
```
import ToastProvider from '~/components/toast/toast-provider'
// 載入 context

const upperCompoent = () => {

  ...
  return (
    <ToastProvider>
      children component} 
    </ToastProvider>
  )
}
// 使用載入的 ToastProvider 包覆住要子元件
// 注入 context，使得下層能夠取得 context 的內容
```

下層元件使用

```
import { useToast } from '~/components/toast/use-toast.ts'
// 載入 useToast 方法

...
const toast = useToast()
// 建立 toast 實例

...
toast.open({
  tatus: 'success'
  title: 'test title'
  desc: 'test description'
})
// 使用 open() 方法，並傳入適當資料，增加一筆新的 toast 訊息並顯示
```

* 目前 `layout/default` 有注入 context，
可以在有使用該 layout 的頁面下呈現 toast 訊息。

* `open()` 方法的參數可以參考 [@types/toast.ts](../../types//toast.ts) 中的 `ToastData` 定義。