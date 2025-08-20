export function getShareUrl(urlTemplate: string, url: string) {
  return urlTemplate.replace('${url}', url)
}

export function getStoryUrl(storyId: string, lng: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/${lng}/story/${storyId}`
  }
  return ''
}

export function getCollectionUrl(collectionId: string, lng: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/${lng}/collection/${collectionId}`
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

export function getSearchUrl(text: string, lng: string) {
  return `/${lng}/search/${encodeURIComponent(text.trim())}`
}

export function getLoginUrl(lng: string) {
  return `/${lng}/login`
}

export function getPolicyUrl(pathName: string) {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${pathName}`
  }
  return ''
}

export function getPointUrl(lng: string, subPath?: string) {
  const base = `/${lng}/point`
  return subPath ? `${base}/${subPath}` : base
}

export function getPointRecordUrl(lng: string, id: string) {
  return `/${lng}/point/record/${id}`
}

export function getPointSponsorshipUrl(lng: string) {
  return `/${lng}/point/sponsorship`
}

export function getPointSubscribeStoriesUrl(lng: string) {
  return `/${lng}/point/subscribe-stories`
}
