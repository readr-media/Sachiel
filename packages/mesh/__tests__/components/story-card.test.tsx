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
  default: () => 'homepage',
}))

jest.mock('@/hooks/use-user-payload', () => ({
  __esModule: true,
  default: () => null,
}))

jest.mock('next/navigation', () => ({
  useParams: () => ({ lng: 'en' }),
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

jest.mock('@/utils/event-logs', () => ({
  logClickEvent: jest.fn(),
}))

// Now import StoryCard after mocks are set up
import StoryCard from '@/app/[lng]/_components/story-card'

describe('StoryCard Video Icon', () => {
  const mockStory = {
    id: 'test-story-1',
    title: 'Test Story Title',
    url: 'https://example.com/story',
    summary: 'Test story summary',
    og_title: 'Test Story Title',
    og_image: 'https://example.com/image.jpg',
    og_description: 'Test story description',
    published_date: '2025-01-15',
    full_content: true,
    commentCount: 5,
    paywall: false,
    full_screen_ad: 'none',
    isMember: false,
    source: {
      id: 'source-1',
      title: 'Test Source',
      customId: 'test-source',
    },
    story_type: 'story',
    picksCount: 10,
    category: {
      id: 'cat-1',
      slug: 'test-category',
    },
    picks: [],
    comment: {},
  }

  const mockGtmTags = {
    story: 'gtm-story-click',
    pick: 'gtm-pick-click',
  }

  it('shows video icon when story type is video', () => {
    const videoStory = {
      ...mockStory,
      story_type: 'video',
    }

    const { getByTestId } = render(
      <StoryCard story={videoStory} gtmTags={mockGtmTags} />
    )

    expect(getByTestId('icon-video-type')).toBeInTheDocument()
  })

  it('does not show video icon when story type is story', () => {
    const regularStory = {
      ...mockStory,
      story_type: 'story',
    }

    const { queryByTestId } = render(
      <StoryCard story={regularStory} gtmTags={mockGtmTags} />
    )

    expect(queryByTestId('icon-video-type')).not.toBeInTheDocument()
  })

  it('does not show video icon when story type is podcast', () => {
    const podcastStory = {
      ...mockStory,
      story_type: 'podcast',
    }

    const { queryByTestId } = render(
      <StoryCard story={podcastStory} gtmTags={mockGtmTags} />
    )

    expect(queryByTestId('icon-video-type')).not.toBeInTheDocument()
  })

  it('does not show video icon when story type is undefined', () => {
    const { queryByTestId } = render(
      <StoryCard story={mockStory} gtmTags={mockGtmTags} />
    )

    expect(queryByTestId('icon-video-type')).not.toBeInTheDocument()
  })
})
