import dayjs from 'dayjs'
import type { Config } from 'tailwindcss'

import type { Source } from '~/types/common'
const resolveConfig = require('tailwindcss/resolveConfig')
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

import {
  SOURCE_DELEMITER_SECONDARY,
  SOURCE_DELIMITER,
} from '~/constants/politics'
import tailwindConfig from '~/tailwind.config'
import type { FactCheck } from '~/types/politics'

// ref: https://stackoverflow.com/questions/55604798/find-rendered-line-breaks-with-javascript
function getLineBreaks(node: ChildNode) {
  // we only deal with TextNodes
  if (!node || !node.parentNode || node.nodeType !== 3) return []
  // our Range object form which we'll get the characters positions
  const range = document.createRange()
  // here we'll store all our lines
  const lines = []
  // begin at the first char
  range.setStart(node, 0)
  // initial position
  let prevBottom = range.getBoundingClientRect().bottom
  let str = node.textContent ?? ''
  let current = 1 // we already got index 0
  let lastFound = 0
  let bottom = 0
  // iterate over all characters
  while (current <= str.length) {
    // move our cursor
    range.setStart(node, current)
    if (current < str.length - 1) range.setEnd(node, current + 1)
    bottom = range.getBoundingClientRect().bottom
    if (bottom > prevBottom) {
      // line break
      lines.push(
        str.substr(lastFound, current - lastFound) // text content
      )
      prevBottom = bottom
      lastFound = current
    }
    current++
  }
  // push the last line
  lines.push(str.substr(lastFound))

  return lines
}

function getTailwindConfig(): Config {
  return resolveConfig(tailwindConfig)
}

function isURL(urlString: string): boolean {
  try {
    let url = new URL(urlString)

    if (url.origin === 'null') {
      // prevent `javascript:void(0)` from being a valid url
      return false
    }
  } catch (err) {
    return false
  }
  return true
}

async function fireGqlRequest<T>(
  query: string,
  variables: undefined | Record<string, T>,
  apiUrl: string = 'http://localhost:3000/api/data'
) {
  const { data: result } = await axios({
    url: apiUrl,
    method: 'post',
    data: {
      query,
      variables,
    },
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
  })

  if (result.errors) {
    throw new Error('GraphQL errors: ' + JSON.stringify(result.errors))
  }

  return result
}

// ref: https://fettblog.eu/typescript-hasownproperty/
function typedHasOwnProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, any> {
  return obj.hasOwnProperty(prop)
}

function hasOwnByArray(obj: Record<string, unknown>, keys: string[]): boolean {
  return keys.reduce((isPass: boolean, current: string) => {
    if (!obj.hasOwnProperty(current)) isPass = false
    return isPass
  }, true)
}

function partyName(party: string | null | undefined): string {
  return !party ? '無黨籍' : party
}

function electionName<T extends string | number | undefined>(
  year: T,
  name: T,
  area: T
): string {
  // replace year info in election.name with emepty string
  return [year, String(name).replace(/^\d+年/, ''), area]
    .filter((text) => text !== undefined)
    .join(' ')
}

function getNewSource(): Source {
  return {
    id: uuidv4(),
    value: '',
    error: '',
  }
}

function stringToSources(
  str: string,
  delimiter: string = SOURCE_DELIMITER
): Source[] {
  return str?.split(delimiter).map((s) => ({
    id: uuidv4(),
    value: s,
    error: '',
  }))
}

function sourcesToString(
  sources: Source[],
  delimiter: string = SOURCE_DELIMITER
): string {
  return sources.map((s) => s.value).join(delimiter)
}

type SourceMeta = {
  isLink: boolean
  link: string
  text: string
}

function generateSourceMeta(
  content: string,
  textPrefix: string,
  no: number
): SourceMeta {
  let isLink: boolean = false
  let link: string = ''
  let text: string = ''

  const contentPair = content.split(SOURCE_DELEMITER_SECONDARY)

  switch (contentPair.length) {
    case 1: {
      link = contentPair[0]
      isLink = isURL(link)
      text = isLink ? `來源 ${no}` : `${textPrefix}${content}`
      break
    }
    case 2: {
      link = contentPair[0]
      isLink = isURL(link)
      text = isLink ? `${textPrefix}${contentPair[1]}` : link
      break
    }
    default: {
      break
    }
  }

  return {
    isLink,
    link,
    text,
  }
}

function getFormattedDate(date: string): string | undefined {
  if (typeof date !== 'string' || !date) return

  const formattedDate = dayjs(date).format('YYYY-MM-DD')
  return formattedDate
}

function getCheckResultString(checkResultType: string, factCheck: FactCheck) {
  const checkResultMappings: { [key: string]: string } = {
    '1': '與所查資料相符',
    '2': '數據符合，但推論錯誤',
    '3': '數據符合，但與推論無關',
    '4': '數據符合，但僅取片段資訊，無法瞭解全貌',
    '5': '片面事實，有一些前提或關鍵事實被隱藏',
    '6': '與所查資料不符合，且推論過於簡化',
    '7': '不知道數據出處為何',
    '8': '數據並非例行統計，今年才發布',
    '9': '其說法並沒有提出證據',
  }

  if (checkResultType === '10' && factCheck.checkResultOther) {
    return factCheck.checkResultOther
  }

  return checkResultMappings[checkResultType] || factCheck.checkResultOther
}

function getPositionChangeString(isChanged: string) {
  const positionChangeMappings: { [key: string]: string } = {
    same: '曾持相同意見',
    changed: '曾持不同意見',
    noComment: '當時未表態',
  }

  return positionChangeMappings[isChanged] || '曾持相同意見'
}

export {
  electionName,
  fireGqlRequest,
  generateSourceMeta,
  getCheckResultString,
  getFormattedDate,
  getLineBreaks,
  getNewSource,
  getPositionChangeString,
  getTailwindConfig,
  hasOwnByArray,
  isURL,
  partyName,
  sourcesToString,
  stringToSources,
  typedHasOwnProperty,
}
