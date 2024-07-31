const sideIndexHeaderIdPrefix = 'side-index-header-'

function removeAllWhiteSpces(str: string) {
  return str.replace(/\s+/g, '')
}

export function genReadrSideIndexHeaderId(
  sideIndexText: string,
  h2Text: string
) {
  const sideIndexTitle = sideIndexText || h2Text || ''

  const key = removeAllWhiteSpces(sideIndexTitle)
  return sideIndexHeaderIdPrefix + key
}

export function genMMSideIndexHeaderId(sideIndexId: string) {
  return sideIndexHeaderIdPrefix + sideIndexId
}
