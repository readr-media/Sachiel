import type { Config } from 'tailwindcss'
import type { Source } from '~/types/common'
const resolveConfig = require('tailwindcss/resolveConfig')
import tailwindConfig from '~/tailwind.config'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { SOURCE_DELIMITER } from '~/constants/politics'

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
export {
  getLineBreaks,
  getTailwindConfig,
  isURL,
  fireGqlRequest,
  hasOwnByArray,
  partyName,
  electionName,
  typedHasOwnProperty,
  getNewSource,
  sourcesToString,
  stringToSources,
}
