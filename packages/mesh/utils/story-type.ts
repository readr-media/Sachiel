export const STORY_TYPES = {
  STORY: 'story',
  PODCAST: 'podcast',
  VIDEO: 'video',
} as const

export type StoryType = typeof STORY_TYPES[keyof typeof STORY_TYPES]

export const getValidatedStoryType = (
  storyType: string | undefined | null
): StoryType => {
  if (!storyType) return STORY_TYPES.STORY

  const upperCaseType = storyType.toUpperCase() as keyof typeof STORY_TYPES
  return STORY_TYPES[upperCaseType] || STORY_TYPES.STORY
}

export const isVideoType = (storyType: StoryType): boolean => {
  return storyType === STORY_TYPES.VIDEO
}

export const isPodcastType = (storyType: StoryType): boolean => {
  return storyType === STORY_TYPES.PODCAST
}

export const isStoryType = (storyType: StoryType): boolean => {
  return storyType === STORY_TYPES.STORY
}

// Extract YouTube video ID from various URL formats
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}
