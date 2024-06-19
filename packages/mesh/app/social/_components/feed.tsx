import Image from 'next/image'

import Icon from '@/components/icon'
import StoryMeta from '@/components/story-card/story-meta'
import StoryPickButton from '@/components/story-card/story-pick-button'
import StoryPickInfo from '@/components/story-card/story-pick-info'
import type { UserActionStoryFragment } from '@/graphql/__generated__/graphql'
import { getDisplayPicks } from '@/utils/story-display'

import FeedComment from './feed-comment'
import FeedLatestAction from './feed-latest-action'

export default function Feed({
  story,
  isStoryPickedByCurrentMember,
  followingMemberIds,
}: {
  story: UserActionStoryFragment
  isStoryPickedByCurrentMember: boolean
  followingMemberIds: Set<string>
}) {
  if (!story) {
    return null
  }
  const picksFromFollowingMember = story.pick?.filter((pick) =>
    followingMemberIds.has(pick.member?.id ?? '')
  )

  const commentsFromFollowingMember = story.comment?.filter((comment) =>
    followingMemberIds.has(comment.member?.id ?? '')
  )

  const storyActions = processStoryActions(
    picksFromFollowingMember,
    commentsFromFollowingMember
  )

  const displayPicks = getDisplayPicks(story.pick, followingMemberIds)

  return (
    <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white drop-shadow sm:rounded-md">
      <div className="flex items-center justify-between px-5 py-3">
        <FeedLatestAction actions={storyActions} />
        <button>
          <Icon iconName="icon-more-horiz" size="l" />
        </button>
      </div>
      {story.og_image ? (
        <div className="aspect-[2/1] overflow-hidden bg-multi-layer-light">
          <Image
            src={story.og_image}
            alt={story.title ?? ''}
            width={600}
            height={300}
            sizes="100vw"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ) : null}
      <div className="px-8 pb-6 pt-3">
        <h4 className="body-3 mb-1 text-primary-500">{story.source?.title}</h4>
        <h2 className="title-1 mb-2 line-clamp-2 break-words">{story.title}</h2>
        <div className="footnote mb-4">
          <StoryMeta
            commentCount={story.commentCount ?? 0}
            publishDate={story.published_date}
            paywall={story.paywall ?? false}
            fullScreenAd={story.full_screen_ad ?? ''}
          />
        </div>
        <div className="mb-4 flex h-8 justify-between">
          <StoryPickInfo
            displayPicks={displayPicks}
            pickCount={story.pickCount ?? 0}
          />
          <StoryPickButton isStoryPicked={isStoryPickedByCurrentMember} />
        </div>
        {storyActions.commentsData ? (
          <FeedComment comment={storyActions.commentsData[0]} />
        ) : null}
      </div>
    </div>
  )
}

export type LatestAction = ReturnType<typeof processStoryActions>

function processStoryActions(
  picks: UserActionStoryFragment['pick'],
  comments: UserActionStoryFragment['comment']
) {
  if (!picks || !comments)
    return {
      picksNum: 0,
      commentsNum: 0,
      picksData: [],
      commentsData: null,
    }
  const picksNum = picks.length
  const commentsNum = comments.length
  let slicedPicks = picks.slice(0, 4)
  const slicedComments = comments.slice(0, 2)

  if (picksNum > 0 && commentsNum > 0) {
    const latestPick = new Date(picks[0].createdAt).getTime()
    const latestComment = new Date(comments[0].createdAt).getTime()
    if (latestPick > latestComment) {
      const commentFromLatestPickMember = comments.find(
        (item) => item.member?.id === picks[0].member?.id
      )
      return {
        picksNum,
        commentsNum,
        picksData: slicedPicks,
        commentsData: commentFromLatestPickMember
          ? [commentFromLatestPickMember, ...slicedComments]
          : null,
      }
    } else {
      const matchingPickIndex = picks.findIndex(
        (item) => item.member?.id === comments[0].member?.id
      )
      if (matchingPickIndex !== -1) {
        const notMatchPicks = picks.filter(
          (item) => item.member?.id !== comments[0].member?.id
        )
        slicedPicks = [picks[matchingPickIndex], ...notMatchPicks.slice(0, 3)]
      }

      return {
        picksNum,
        commentsNum,
        picksData: slicedPicks,
        commentsData: matchingPickIndex !== -1 ? slicedComments : null,
      }
    }
  } else if (commentsNum > 0) {
    return {
      picksNum,
      commentsNum,
      picksData: slicedPicks,
      commentsData: slicedComments,
    }
  } else {
    return {
      picksNum,
      commentsNum,
      picksData: slicedPicks,
      commentsData: null,
    }
  }
}
