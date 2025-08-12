const sideIndexHeaderIdPrefix = 'side-index-header-'

function createIdFromText(text: string) {
  return text
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s\p{Script=Han}-]/gu, '') // Remove all non-word characters except spaces, hyphens, and Chinese characters
    .replace(/\s+/g, '') // Replace spaces
}

export function genReadrSideIndexHeaderId(
  sideIndexText: string,
  h2Text: string
) {
  const sideIndexTitle = sideIndexText || h2Text || ''

  const key = createIdFromText(sideIndexTitle)
  return sideIndexHeaderIdPrefix + key
}

export function genMMSideIndexHeaderId(sideIndexId: string) {
  return sideIndexHeaderIdPrefix + sideIndexId
}
