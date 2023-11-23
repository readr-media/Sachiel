import axios from 'axios'

import { URL_PROGRAMABLE_SEARCH } from '~/constants'
import {
  ProgrammableSearchAPIKey,
  ProgrammableSearchEngineID,
} from '~/constants/environment-variables'

export async function searchAPI(query: string | string[], startIndex: number) {
  console.log('startIndex', startIndex)

  const url = `${URL_PROGRAMABLE_SEARCH}`
  const params = {
    cx: `${ProgrammableSearchEngineID}`,
    key: `${ProgrammableSearchAPIKey}`,
    q: query,
    start: startIndex,
    num: 10,
    // TODO: sort
  }

  try {
    const response = await axios.get(url, { params })
    const data = response.data

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
