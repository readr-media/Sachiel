import Icon from '@/components/icon'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import StoryCommentCount from '@/components/story-card/story-comment-count'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickCount from '@/components/story-card/story-pick-count'
import type { GetStoryQuery } from '@/graphql/__generated__/graphql'

export enum BottomActionBarType {
  Article = 'article',
  Empty = 'empty',
}

export type MobileBottomActionBarProps =
  | { type: BottomActionBarType.Article; story: Story }
  | { type: BottomActionBarType.Empty }
export default function MobileBottomActionBar(
  props: MobileBottomActionBarProps
) {
  switch (props.type) {
    case BottomActionBarType.Article:
      return <ArticleBottomActionBar story={props.story} />

    case BottomActionBarType.Empty:
    default:
      return null
  }
}

type Story = NonNullable<GetStoryQuery>['story']
const ArticleBottomActionBar = ({ story }: { story: Story }) => {
  const picksCount = story?.picksCount ?? 0
  const commentsCount = story?.commentsCount ?? 0
  return (
    <nav className="fixed inset-x-0 bottom-0 h-[theme(height.nav.default)] border-t bg-white shadow-[0_0_8px_0px_rgba(0,0,0,0.1)] sm:hidden">
      <div className="footnote flex justify-between px-5 pt-4 text-primary-500 shadow-[0_-8px_20px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center">
          {!!commentsCount && (
            <>
              <StoryCommentCount commentsCount={commentsCount} />
              <Icon iconName="icon-dot" size="s" />
            </>
          )}
          <StoryPickCount picksCount={picksCount} />
        </div>
        <div className="flex gap-2">
          <PublisherDonateButton />
          <StoryPickButton storyId={story?.id ?? ''} />
        </div>
      </div>
    </nav>
  )
}
