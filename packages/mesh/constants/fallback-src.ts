export enum ImageCategory {
  STORY = 'story',
  AVATAR = 'avatar',
  PUBLISHER = 'publisher',
  PODCAST = 'podcast',
}

export const DEFAULT_IMAGES: Record<ImageCategory, string> = {
  [ImageCategory.STORY]: '/images/default-story-image.webP',
  [ImageCategory.AVATAR]: '/images/default-avatar-image.png',
  [ImageCategory.PUBLISHER]: '/images/default-publisher-logo.png',
  [ImageCategory.PODCAST]: '/images/default-podcast-logo.png',
}
