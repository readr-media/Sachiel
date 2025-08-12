# i18n 資料夾結構和使用指南

## 資料夾結構

```
i18n/
├── locales/
│   ├── pages/          # 頁面層級的翻譯
│   │   ├── home/
│   │   │   ├── zh-TW.json
│   │   │   └── en-US.json
│   │   ├── profile/
│   │   │   ├── zh-TW.json
│   │   │   └── en-US.json
│   │   └── ...
│   ├── components/     # 組件層級的翻譯
│   │   ├── story-card/
│   │   │   ├── zh-TW.json
│   │   │   └── en-US.json
│   │   ├── category-story/
│   │   │   ├── zh-TW.json
│   │   │   └── en-US.json
│   │   └── ...
│   ├── zh-TW.json      # 向後相容的全域翻譯
│   └── en-US.json      # 向後相容的全域翻譯
├── i18next.ts
└── index.ts

```

## 使用方法

### Server Components (使用 getT)

```typescript
import { getT } from '@/app/i18n'

export default async function HomePage() {
  const { t } = await getT('pages/home')
  return <h1>{t('DailyHighlight-title')}</h1>
}
```

### Client Components (使用 useT)

```typescript
'use client'
import { useT } from '@/app/i18n/client'

export default function StoryCard() {
  const { t } = useT('components/story-card')
  return <button>{t('pick')}</button>
}
```

### 翻譯檔案範例

**pages/home/zh-TW.json**
```json
{
  "DailyHighlight-title": "今日焦點",
  "TopCollectorSection-title": "本週精選最多文章"
}
```

**components/story-card/zh-TW.json**
```json
{
  "pick": "精選",
  "already-picked": "已精選",
  "paywall": "付費文章"
}
```

## 優點

1. **模組化**: 每個頁面/組件有自己的翻譯檔案
2. **易維護**: 不會有巨大的單一 JSON 檔案
3. **按需載入**: 只載入需要的翻譯
4. **清晰的結構**: 對應頁面和組件結構
5. **向後相容**: 仍支援原有的全域翻譯檔案

## 遷移指南

1. 從原有的大檔案中提取對應的翻譯
2. 按照頁面/組件結構建立新的 namespace 檔案
3. 更新組件中的 `getT` 和 `useT` 調用
4. 漸進式遷移，可以同時使用新舊結構