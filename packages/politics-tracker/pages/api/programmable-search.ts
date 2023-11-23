import axios from 'axios'

import { URL_PROGRAMABLE_SEARCH } from '~/constants'
import {
  ProgrammableSearchAPIKey,
  ProgrammableSearchEngineID,
} from '~/constants/config'

export async function searchAPI(query: string | string[], startIndex: number) {
  const url = `${URL_PROGRAMABLE_SEARCH}`
  const params = {
    cx: `${ProgrammableSearchEngineID}`,
    key: `${ProgrammableSearchAPIKey}`,
    q: query,
    start: startIndex,
    num: 10,
    safe: 'active',
  }

  try {
    const response = await axios.get(url, { params })
    const data = response.data

    return data
  } catch (error) {
    console.error(error)
    //@ts-ignore
    // console.log(JSON.stringify({ severity: 'ERROR', message: error.stack }))
    return null
  }
}
