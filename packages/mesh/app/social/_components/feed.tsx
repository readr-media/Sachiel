import Image from 'next/image'

import Icon from '@/components/icon'
import { socialPageAvatarLayer } from '@/constants/z-index'
import type { Story } from '@/graphql/query/member'
import { displayTimeFromNow } from '@/utils/story-display'

import FeedComment from './feed-comment'
import FeedLatestAction from './feed-latest-action'
import FeedPick from './feed-pick'
import RenderAvatar from './render-avatar'

export default function Feed({
  story,
  isStoryPickedByCurrentUser,
  followingMemberIds,
}: {
  story: Story
  isStoryPickedByCurrentUser: boolean
  followingMemberIds: Set<string>
}) {
  if (!story) {
    return null
  }
  const picksFromFollowingMember: Story['pick'] = []
  const picksFromStranger: Story['pick'] = []
  let picksFromAll: Story['pick'] = []

  story.pick.forEach((pick) =>
    followingMemberIds.has(pick.member.id)
      ? picksFromFollowingMember.push(pick)
      : picksFromStranger.push(pick)
  )

  const commentsFromFollowingMember = story.comment.filter((comment) =>
    followingMemberIds.has(comment.member.id)
  )

  const storyActions = processStoryActions(
    picksFromFollowingMember,
    commentsFromFollowingMember
  )

  if (storyActions.picksData.length < 4) {
    picksFromAll = [...storyActions.picksData, ...picksFromStranger].slice(0, 4)
  } else {
    picksFromAll = [...storyActions.picksData]
  }

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
            alt={story.title}
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
        <h2 className="title-1 line-clamp-2 mb-2 break-words">{story.title}</h2>
        <div className="footnote mb-4 flex items-center text-primary-500">
          <Icon iconName="icon-chat-bubble" size="s" />
          <div className="pl-0.5">{story.commentCount}</div>
          <Icon iconName="icon-dot" size="s" />
          <div>
            <span>{displayTimeFromNow(story.published_date)}</span>
          </div>
          {story.paywall ? (
            <div className="flex items-center">
              <Icon iconName="icon-dot" size="s" />
              付費文章
            </div>
          ) : null}
          {story.full_screen_ad !== 'none' ? (
            <div className="flex items-center">
              <Icon iconName="icon-dot" size="s" />
              蓋板廣告
            </div>
          ) : null}
        </div>
        <div className="footnote mb-4 flex h-8 justify-between text-primary-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1 overflow-hidden">
              {picksFromAll.map((data, index) => (
                <div
                  key={data.member.id}
                  style={{ zIndex: socialPageAvatarLayer[index] }}
                >
                  <RenderAvatar src={data.member.avatar} px={28} />
                </div>
              ))}
            </div>
            <div className="flex items-center">
              {renderTotalPicks(story.pickCount)}
            </div>
          </div>
          <FeedPick isFeedPicked={isStoryPickedByCurrentUser} />
        </div>
        {storyActions.commentsData ? (
          <FeedComment comment={storyActions.commentsData[0]} />
        ) : null}
      </div>
    </div>
  )
}

const renderTotalPicks = (picksCount: number) => {
  if (picksCount < 10000) {
    return (
      <>
        <span className="pr-1 text-primary-700">{picksCount}</span>
        <span>人精選</span>
      </>
    )
  } else {
    const convertedPickCount = (Math.floor(picksCount / 1000) / 10).toFixed(1)
    return (
      <>
        <span className="pr-1 text-primary-700">{convertedPickCount}</span>
        <span>萬人精選</span>
      </>
    )
  }
}

export type LatestAction = ReturnType<typeof processStoryActions>

function processStoryActions(picks: Story['pick'], comments: Story['comment']) {
  const picksNum = picks.length
  const commentsNum = comments.length
  let slicedPicks = picks.slice(0, 4)
  const slicedComments = comments.slice(0, 2)

  if (picksNum > 0 && commentsNum > 0) {
    const latestPick = new Date(picks[0].createdAt).getTime()
    const latestComment = new Date(comments[0].createdAt).getTime()
    if (latestPick > latestComment) {
      const commentFromLatestPickMember = comments.find(
        (item) => item.member.id === picks[0].member.id
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
        (item) => item.member.id === comments[0].member.id
      )
      if (matchingPickIndex !== -1) {
        const notMatchPicks = picks.filter(
          (item) => item.member.id !== comments[0].member.id
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
