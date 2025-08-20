import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

// Mock all problematic dependencies
jest.mock('@/hooks/use-custom-translation', () => ({
  useCustomTranslation: () => ({
    t: (key: string, fallback: string) => {
      const translations: { [key: string]: string } = {
        'Components.StoryMeta.payall': 'Paid Story',
        'Components.StoryMeta.full-screen-ad': 'Full-screen Ad',
        'Components.StoryMeta.podcast': 'Podcast',
      }
      return translations[key] || fallback
    },
  }),
}))

// Mock the displayTimeFromNow utility
jest.mock('@/utils/story-display', () => ({
  displayTimeFromNow: jest.fn(() => '2 hours ago'),
}))

// Mock CommentCount component
jest.mock('@/components/comment-count', () => {
  return function MockCommentCount() {
    return <span>5</span>
  }
})

// Mock Icon component
jest.mock('@/components/icon', () => {
  return function MockIcon({ iconName }: { iconName: string }) {
    return <span data-testid={iconName}>{iconName}</span>
  }
})

// Now import StoryMeta after mocks are set up
import StoryMeta from '@/components/story-card/story-meta'

describe('StoryMeta i18n', () => {
  it('should display translated paywall text', () => {
    const { getByText } = render(
      <StoryMeta
        storyId="test"
        commentCount={5}
        publishDate="2025-01-15"
        paywall={true}
        fullScreenAd=""
      />
    )

    expect(getByText('Paid Story')).toBeInTheDocument()
  })

  it('should display translated full-screen ad text', () => {
    const { getByText } = render(
      <StoryMeta
        storyId="test"
        commentCount={5}
        publishDate="2025-01-15"
        paywall={false}
        fullScreenAd="banner"
      />
    )

    expect(getByText('Full-screen Ad')).toBeInTheDocument()
  })

  it('should display translated podcast text', () => {
    const { getByText } = render(
      <StoryMeta
        storyId="test"
        commentCount={5}
        publishDate="2025-01-15"
        paywall={false}
        fullScreenAd=""
        storyType="podcast"
      />
    )

    expect(getByText('Podcast')).toBeInTheDocument()
  })

  it('should not display paywall text when paywall is false', () => {
    const { queryByText } = render(
      <StoryMeta
        storyId="test"
        commentCount={5}
        publishDate="2025-01-15"
        paywall={false}
        fullScreenAd=""
      />
    )

    expect(queryByText('Paid Story')).not.toBeInTheDocument()
  })

  it('should not display full-screen ad text when fullScreenAd is "none"', () => {
    const { queryByText } = render(
      <StoryMeta
        storyId="test"
        commentCount={5}
        publishDate="2025-01-15"
        paywall={false}
        fullScreenAd="none"
      />
    )

    expect(queryByText('Full-screen Ad')).not.toBeInTheDocument()
  })

  it('should not display podcast text when storyType is "story"', () => {
    const { queryByText } = render(
      <StoryMeta
        storyId="test"
        commentCount={5}
        publishDate="2025-01-15"
        paywall={false}
        fullScreenAd=""
        storyType="story"
      />
    )

    expect(queryByText('Podcast')).not.toBeInTheDocument()
  })
})
