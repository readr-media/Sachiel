import type { Config } from 'tailwindcss'
import type { Source } from '../types/politics'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'
import { v4 as uuidv4 } from 'uuid'

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

function getNewSource(): Source {
  return {
    id: uuidv4(),
    value: '',
    error: '',
  }
}

export { getLineBreaks, getTailwindConfig, getNewSource }
