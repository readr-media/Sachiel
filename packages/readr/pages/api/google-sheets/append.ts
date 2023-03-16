import type { GaxiosError } from 'gaxios'
import { google } from 'googleapis'
import type { NextApiRequest, NextApiResponse } from 'next'

import { reportGoogleSheetApiError } from '~/utils/api'
import { loadCredentails } from '~/utils/google-api-auth'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body: sheetRequest } = req

  try {
    const auth = loadCredentails()

    if (auth === null) {
      throw new Error('failed to get Google API OAuth client')
    }

    const sheets = google.sheets({
      version: 'v4',
      auth,
    })

    const { data, status = 200 } = await sheets.spreadsheets.values.append(
      sheetRequest
    )

    res.status(status).send(data)
  } catch (err) {
    const gaxiosError = err as GaxiosError
    reportGoogleSheetApiError(gaxiosError, res)
  }
}
