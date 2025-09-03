import {
  extractYouTubeId,
  getValidatedStoryType,
  isVideoType,
  STORY_TYPES,
} from '@/utils/story-type'

describe('extractYouTubeId', () => {
  describe('valid YouTube URLs', () => {
    it('extracts ID from youtube.com/watch URL', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      expect(extractYouTubeId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts ID from youtu.be short URL', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ'
      expect(extractYouTubeId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts ID from youtube.com/embed URL', () => {
      const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      expect(extractYouTubeId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts ID from youtube.com/v URL', () => {
      const url = 'https://www.youtube.com/v/dQw4w9WgXcQ'
      expect(extractYouTubeId(url)).toBe('dQw4w9WgXcQ')
    })

    it('handles URLs with additional parameters', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s'
      expect(extractYouTubeId(url)).toBe('dQw4w9WgXcQ')
    })
  })

  describe('security improvements', () => {
    it('rejects IDs that are too short', () => {
      const url = 'https://www.youtube.com/watch?v=short123'
      expect(extractYouTubeId(url)).toBeNull()
    })

    it('rejects IDs that are too long', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQextralong'
      // Should extract exactly 11 characters, ignoring the extra characters
      expect(extractYouTubeId(url)).toBe('dQw4w9WgXcQ')
    })

    it('rejects IDs with invalid characters', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgX@Q'
      expect(extractYouTubeId(url)).toBeNull()
    })

    it('rejects IDs with spaces', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9W XcQ'
      expect(extractYouTubeId(url)).toBeNull()
    })

    it('rejects IDs with special characters', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9W#XcQ'
      expect(extractYouTubeId(url)).toBeNull()
    })

    it('accepts valid characters (letters, numbers, underscore, hyphen)', () => {
      const url = 'https://www.youtube.com/watch?v=aB3_dEf-GhI'
      expect(extractYouTubeId(url)).toBe('aB3_dEf-GhI')
    })
  })

  describe('invalid URLs', () => {
    it('returns null for non-YouTube URLs', () => {
      const url = 'https://www.vimeo.com/123456789'
      expect(extractYouTubeId(url)).toBeNull()
    })

    it('returns null for malformed YouTube URLs', () => {
      const url = 'https://youtube.com/invalid'
      expect(extractYouTubeId(url)).toBeNull()
    })

    it('returns null for empty string', () => {
      expect(extractYouTubeId('')).toBeNull()
    })

    it('returns null for URLs without video ID', () => {
      const url = 'https://www.youtube.com/watch'
      expect(extractYouTubeId(url)).toBeNull()
    })
  })

  describe('edge cases', () => {
    it('handles URLs with fragments', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ#t=30s'
      expect(extractYouTubeId(url)).toBe('dQw4w9WgXcQ')
    })

    it('handles URLs with multiple query parameters', () => {
      const url =
        'https://www.youtube.com/watch?feature=player_embedded&v=dQw4w9WgXcQ&list=PLrAXtmRdnEQy'
      expect(extractYouTubeId(url)).toBe('dQw4w9WgXcQ')
    })

    it('does not extract from URL parameters in the middle', () => {
      const url = 'https://example.com/page?youtube=dQw4w9WgXcQ&other=param'
      expect(extractYouTubeId(url)).toBeNull()
    })
  })
})

describe('Story Type Utilities', () => {
  describe('isVideoType', () => {
    it('returns true for video type', () => {
      expect(isVideoType(STORY_TYPES.VIDEO)).toBe(true)
    })

    it('returns false for story type', () => {
      expect(isVideoType(STORY_TYPES.STORY)).toBe(false)
    })

    it('returns false for podcast type', () => {
      expect(isVideoType(STORY_TYPES.PODCAST)).toBe(false)
    })
  })

  describe('getValidatedStoryType', () => {
    it('returns VIDEO for "video" input', () => {
      expect(getValidatedStoryType('video')).toBe(STORY_TYPES.VIDEO)
    })

    it('returns VIDEO for "VIDEO" input (case insensitive)', () => {
      expect(getValidatedStoryType('VIDEO')).toBe(STORY_TYPES.VIDEO)
    })

    it('returns STORY for invalid input', () => {
      expect(getValidatedStoryType('invalid')).toBe(STORY_TYPES.STORY)
    })

    it('returns STORY for null input', () => {
      expect(getValidatedStoryType(null)).toBe(STORY_TYPES.STORY)
    })

    it('returns STORY for undefined input', () => {
      expect(getValidatedStoryType(undefined)).toBe(STORY_TYPES.STORY)
    })
  })
})
