export function getShareUrl(urlTemplate: string, url: string) {
  return urlTemplate.replace('${url}', url)
}

export function getStoryUrl(storyId: string, lng: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/${lng}/story/${storyId}`
  }
  return ''
}

export function getCollectionUrl(collectionId: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/collection/${collectionId}`
  }
  return ''
}

export function getMemberProfileUrl(
  customId: string,
  typeOfUser: 'member' | 'publisher'
) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/profile/${typeOfUser}/${customId}`
  }
  return ''
}

export function getSearchUrl(text: string) {
  return `/search/${encodeURIComponent(text.trim())}`
}

export function getPolicyUrl(pathName: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${pathName}`
  }
  return ''
}
