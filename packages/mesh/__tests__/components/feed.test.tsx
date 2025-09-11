import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

// Mock all problematic dependencies
jest.mock('@/hooks/use-display-picks', () => ({
  useDisplayPicks: () => ({
    displayPicks: [],
    displayPicksCount: 0,
  }),
}))

jest.mock('@/hooks/use-page-name', () => ({
  __esModule: true,
  default: () => 'social',
}))

jest.mock('@/hooks/use-user-payload', () => ({
  __esModule: true,
  default: () => null,
}))

// Mock Icon component
jest.mock('@/components/icon', () => {
  return function MockIcon({ iconName }: { iconName: string }) {
    return <span data-testid={iconName}>{iconName}</span>
  }
})

// Mock other components
jest.mock('@/components/general-objective/objective-pick-info', () => {
  return function MockObjectivePickInfo() {
    return <div>ObjectivePickInfo</div>
  }
})

jest.mock('@/components/story-card/story-meta', () => {
  return function MockStoryMeta() {
    return <div>StoryMeta</div>
  }
})

jest.mock('@/components/story-card/story-pick-button', () => {
  return function MockStoryPickButton() {
    return <div>StoryPickButton</div>
  }
})

jest.mock('@/components/story-more-action-button', () => {
  return function MockStoryMoreActionButton() {
    return <div>StoryMoreActionButton</div>
  }
})

jest.mock('@/app/[lng]/_components/image-with-fallback', () => {
  return function MockImageWithFallback() {
    return <div>ImageWithFallback</div>
  }
})

jest.mock('@/app/[lng]/social/_components/feed-comment', () => {
  return function MockFeedComment() {
    return <div>FeedComment</div>
  }
})

jest.mock('@/app/[lng]/social/_components/feed-latest-action', () => {
  return function MockFeedLatestAction() {
    return <div>FeedLatestAction</div>
  }
})

jest.mock('@/utils/event-logs', () => ({
  logClickEvent: jest.fn(),
}))

// Now import Feed after mocks are set up
import Feed from '@/app/[lng]/social/_components/feed'

describe('Feed Video Icon', () => {
  const mockStory = {
    id: 'test-story-1',
    og_title: 'Test Story Title',
    og_image: 'https://example.com/image.jpg',
    og_description: 'Test story description',
    published_date: '2025-01-15',
    commentCount: 5,
    isMember: false,
    full_screen_ad: 'none' as const,
    readCount: 10,
    publisher: {
      id: 'publisher-1',
      title: 'Test Publisher',
      customId: 'test-publisher',
    },
    following_actions: [],
    story_type: 'story' as const,
    url: 'https://example.com/story/test-story-1',
  }

  it('shows video icon when story type is video', () => {
    const videoStory = {
      ...mockStory,
      story_type: 'video' as const,
    }

    const { getByTestId } = render(<Feed story={videoStory} />)

    expect(getByTestId('icon-video-type')).toBeInTheDocument()
  })

  it('does not show video icon when story type is story', () => {
    const regularStory = {
      ...mockStory,
      story_type: 'story' as const,
    }

    const { queryByTestId } = render(<Feed story={regularStory} />)

    expect(queryByTestId('icon-video-type')).not.toBeInTheDocument()
  })

  it('does not show video icon when story type is podcast', () => {
    const podcastStory = {
      ...mockStory,
      story_type: 'podcast' as const,
    }

    const { queryByTestId } = render(<Feed story={podcastStory} />)

    expect(queryByTestId('icon-video-type')).not.toBeInTheDocument()
  })
})
