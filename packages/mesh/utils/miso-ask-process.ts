import { sanitizeAiAnswer } from './sanitize-html'

const MAX_TEXT_LENGTH = 50000 // Prevent performance issues caused by overly long input
const ALLOWED_URL_PROTOCOLS = ['http:', 'https:'] // URL whitelist

function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false

  try {
    const urlObj = new URL(url)
    return ALLOWED_URL_PROTOCOLS.includes(urlObj.protocol)
  } catch {
    return false
  }
}

function processBoldText(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}

function processListItems(text: string): string {
  return text.replace(/^- (.+)$/gm, '<li>$1</li>')
}

function processReferenceLinks(text: string): string {
  return text.replace(/\[\[(\d+)\]\]\((.*?)\)/g, (match, number, url) => {
    if (!isValidUrl(url)) {
      return `[${number}]`
    }

    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="caption-1 inline-flex size-5 flex-wrap items-center justify-center rounded-full bg-primary-200 text-primary-700 mr-2 last-of-type:mr-0">${number}</a>`
  })
}

function processLineBreaks(text: string): string {
  return text.replace(/\n/g, '<br>')
}

/**
 * Wrap consecutive list items in <ul> tags.
 * Uses a safer approach to avoid complex regular expressions.
 */
function wrapListItems(text: string): string {
  // Split text into paragraphs
  const parts = text.split('<br>')
  const result: string[] = []
  let currentList: string[] = []

  for (const part of parts) {
    const trimmedPart = part.trim()

    // Check if it's a list item
    if (trimmedPart.startsWith('<li>') && trimmedPart.endsWith('</li>')) {
      currentList.push(trimmedPart)
    } else {
      // If not a list item, process accumulated list items first
      if (currentList.length > 0) {
        result.push(
          `<ul class="list-disc list-inside space-y-1 my-2">${currentList.join(
            ''
          )}</ul>`
        )
        currentList = []
      }

      // Add non-list item
      if (trimmedPart) {
        result.push(trimmedPart)
      }
    }
  }

  // Handle the last list items
  if (currentList.length > 0) {
    result.push(
      `<ul class="list-disc list-inside space-y-1 my-2">${currentList.join(
        ''
      )}</ul>`
    )
  }

  return result.join('<br>')
}

/**
 * Process AI answer text, converting Markdown format to safe HTML.
 */
const processAnswerText = (text: string): string => {
  // Input validation
  if (!text || typeof text !== 'string') {
    return ''
  }

  // Prevent overly long input
  if (text.length > MAX_TEXT_LENGTH) {
    console.warn(
      `Text length ${text.length} exceeds maximum ${MAX_TEXT_LENGTH}`
    )
    text = text.substring(0, MAX_TEXT_LENGTH)
  }

  try {
    // Process various marks in order
    let processedText = text
    processedText = processBoldText(processedText)
    processedText = processListItems(processedText)
    processedText = processReferenceLinks(processedText)
    processedText = processLineBreaks(processedText)
    processedText = wrapListItems(processedText)

    // Finally, use DOMPurify for safe sanitization
    return sanitizeAiAnswer(processedText)
  } catch (error) {
    console.error('Failed to process answer text:', error)
    return ''
  }
}

export default processAnswerText
