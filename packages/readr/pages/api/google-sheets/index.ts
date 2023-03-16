/**
 * 主要處理與 Google Sheets API 相關的邏輯
 * Google Sheets API 需要認證，認證檔案是非公開資料，因此必須透過 API 去打
 *
 * References:
 * https://developers.google.com/sheets/api/reference/rest
 */

import type { GaxiosError } from 'gaxios'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

import { reportGoogleSheetApiError } from '~/utils/api'
import { loadCredentails } from '~/utils/google-api-auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sheetRequest = req.query

  try {
    const auth = loadCredentails()

    if (auth === null) {
      throw new Error('failed to get Google API OAuth client')
    }

    const sheets = google.sheets({
      version: 'v4',
      auth,
    })

    const { data, status = 200 } = await sheets.spreadsheets.values.get(
      sheetRequest
    )

    res.status(status).send(data)
  } catch (err) {
    const gaxiosError = err as GaxiosError
    reportGoogleSheetApiError(gaxiosError, res)
  }
}
