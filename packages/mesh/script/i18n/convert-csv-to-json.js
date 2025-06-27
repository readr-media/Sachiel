/* eslint-disable filename-rules/match */
import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// CSV 檔案位置（放在 input 資料夾中）
const inputFile = path.join(__dirname, 'input', 'translations.csv')

// 輸出根目錄
const outputBaseDir = path.join(__dirname, 'output')

const outputZh = {}
const outputEn = {}

fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const type = row['type']
    const subType = row['sub-type']
    const key = row['key']
    const zhTW = row['zh_TW']
    const enUS = row['en_US']

    if (!outputZh[type]) outputZh[type] = {}
    if (!outputZh[type][subType]) outputZh[type][subType] = {}
    if (!outputEn[type]) outputEn[type] = {}
    if (!outputEn[type][subType]) outputEn[type][subType] = {}

    if (key) {
      outputZh[type][subType][key] = zhTW || ''
      outputEn[type][subType][key] = enUS || ''
    }
  })
  .on('end', () => {
    const zhTWDir = path.join(outputBaseDir, 'zh_TW')
    const enUSDir = path.join(outputBaseDir, 'en_US')

    // 建立輸出資料夾
    fs.mkdirSync(zhTWDir, { recursive: true })
    fs.mkdirSync(enUSDir, { recursive: true })

    fs.writeFileSync(
      path.join(zhTWDir, 'translation.json'),
      JSON.stringify(outputZh, null, 2),
      'utf8'
    )
    fs.writeFileSync(
      path.join(enUSDir, 'translation.json'),
      JSON.stringify(outputEn, null, 2),
      'utf8'
    )

    console.log(
      '✅ Translation files generated at output/zh_TW/ and output/en_US/'
    )
  })
