# CSV 多語系轉換工具

本工具可將 Mesh 的 CSV 翻譯檔，轉換為適用於網站國際化 (i18n) 所需的 JSON 格式，並輸出成 `zh-TW/translation.json` 與 `en-US/translation.json`。

---

## 步驟說明

### 1. 下載 CSV 翻譯檔

請至以下連結下載最新的多國語翻譯 CSV 檔案（例如由 Google Sheets 匯出）：

👉 [🔗 點我下載 CSV 翻譯檔](https://docs.google.com/spreadsheets/d/1-ZgOzjxv7eFO6l0JzKdnaU9B4_REzwVfASJNGPO0_9o/edit?gid=0#gid=0) ← 請替換為實際下載網址

下載後請將檔案重新命名為 `translations.csv` 接著放進 `script/i18n/input/` 資料夾中。

### 2. 執行轉換 Script

請先確認你已安裝 [Node.js](https://nodejs.org/)（建議 v18 或以上），然後在專案根目錄執行以下指令：

```bash
node convert-csv-to-json.mjs
```

此指令會：

- 讀取 input/translations.csv
- 將每列依據語系欄位轉換為 nested JSON 結構
- 將轉換後的結果輸出至：

```
output/
├── zh_TW/
│   └── translation.json
└── en_US/
    └── translation.json
```

### 3. 覆蓋網站翻譯資料

執行完 script 後，請將 output/ 資料夾中的翻譯檔案覆蓋掉專案內 /public/locales/ 中的翻譯檔案：

```bash
cp -r output/zh_TW ../../public/locales/
cp -r output/en_US ../../public/locales/
```

### 4. CSV 格式說明

CSV 檔案的欄位格式如下：
| type | sub-type | key | note | zh_TW | en_US |
|-------|----------|----------------------|------|-----------|--------------------|
| Pages | Home | DailyHighlight-title | | 今日焦點 | Top stories today |

轉換後會變成：

```Json
{
  "Pages": {
    "Home": {
      "DailyHighlight-title": "今日焦點"
    }
  }
}
```

### 5. ⚠️ 注意事項

請確認欄位名稱必須為：`type`, `sub-type`, `key`, `zh_TW`, `en_US`

若某語系的欄位為空值，仍會建立 key，值為空字串 ""

若要支援更多語系，可擴充 script 中的語系處理邏輯
