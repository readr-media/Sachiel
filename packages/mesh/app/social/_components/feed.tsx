import Image from 'next/image'
import Link from 'next/link'

import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import StoryMoreActionButton from '@/components/story-more-action-button'
import { useDisplayPicks } from '@/hooks/use-display-picks'
import { type MongoDBResponse } from '@/utils/data-schema'

import FeedComment from './feed-comment'
import FeedLatestAction from './feed-latest-action'

export type StoryActions =
  MongoDBResponse['stories'][number]['following_actions']

export default function Feed({
  story,
}: {
  story: MongoDBResponse['stories'][number]
}) {
  const storyWithPicks = transformSocialStoryPicks(story)
  const { displayPicks, displayPicksCount } = useDisplayPicks(storyWithPicks)
  const { following_actions } = story
  const storyActions = processStoryActions(following_actions)

  return (
    <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white drop-shadow sm:rounded-md">
      <div className="flex items-center justify-between px-5 py-3">
        <FeedLatestAction actions={storyActions} />
        <StoryMoreActionButton
          storyId={story.id}
          publisherId={story.publisher.id}
        />
      </div>
      {story.og_image ? (
        <div className="aspect-[2/1] overflow-hidden bg-multi-layer-light">
          <Link href={`/story/${story.id}`} className="size-full">
            <Image
              src={story.og_image}
              alt={story.og_title}
              width={600}
              height={300}
              sizes="100vw"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Link>
        </div>
      ) : null}
      <div className="px-5 pb-4 pt-3 sm:px-8 sm:pb-6 sm:pt-4">
        <Link href={`/publisher/${story.publisher.customId}}`}>
          <h4 className="body-3 mb-1 text-primary-500 hover-or-active:text-primary-700">
            {story.publisher.title}
          </h4>
        </Link>
        <Link href={`/story/${story.id}`}>
          <h2 className="title-1 mb-2 line-clamp-2 break-words hover-or-active:underline">
            {story.og_title}
          </h2>
        </Link>
        <div className="footnote mb-4">
          <StoryMeta
            commentCount={story.commentCount}
            publishDate={story.published_date}
            paywall={story.isMember}
            fullScreenAd={story.full_screen_ad}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="mb-4 flex h-8 justify-between">
            <StoryPickInfo
              displayPicks={displayPicks}
              pickCount={displayPicksCount}
            />
            <StoryPickButton storyId={story.id} />
          </div>
          {storyActions.commentsData.length ? (
            <FeedComment comment={storyActions.commentsData[0]} />
          ) : null}
        </div>
      </div>
    </div>
  )
}

export type LatestAction = ReturnType<typeof processStoryActions>

function processStoryActions(storyAction: StoryActions) {
  const latestAction = storyAction[0]
  const latestActionType = storyAction[0].kind
  const picksNum = storyAction.filter((action) => action.kind === 'read').length
  const commentsNum = storyAction.filter(
    (action) => action.kind === 'comment'
  ).length
  let picksData: StoryActions = []
  let commentsData: StoryActions = []

  const isPickAndComment =
    storyAction.filter((action) => action.member.id === latestAction.member.id)
      .length > 1

  const filterActions = (kind: 'read' | 'comment', sortByMember = false) =>
    storyAction
      .filter((action) => action.kind === kind)
      .sort((a, _b) =>
        sortByMember && a.member.id === latestAction.member.id ? -1 : 1
      )

  if (latestActionType === 'comment') {
    picksData = isPickAndComment ? filterActions('read', isPickAndComment) : []
    commentsData = filterActions('comment')
  } else {
    picksData = filterActions('read')
    commentsData = isPickAndComment ? filterActions('comment') : []
  }

  return {
    picksNum,
    commentsNum,
    picksData,
    commentsData,
  }
}

export type SocialStoryPicks = ReturnType<typeof transformSocialStoryPicks>
function transformSocialStoryPicks(story: MongoDBResponse['stories'][number]) {
  return {
    id: story.id,
    picks: story.following_actions
      .filter((action) => action.kind === 'read')
      .map((pick) => ({
        member: {
          id: pick.member.id,
          name: pick.member.name,
          avatar: pick.member.avatar,
        },
      })),
    picksCount: story.readCount,
  }
}
