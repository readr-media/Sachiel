import Image from 'next/image'

import Icon from '@/components/icon'
import { DAY, HOUR, MINUTE } from '@/constants/time-unit'
import type {
  GetUserFollowingResponse,
  Member,
  Story,
} from '@/graphql/query/member'

import FeedComment from './feed-comment'
import FeedLatestAction from './feed-latest-action'
import FeedPick from './feed-pick'

export default function Feed({
  story,
  currentUser,
}: {
  story: Story
  currentUser: GetUserFollowingResponse['member']
}) {
  const isStoryPickedByCurrentUser = currentUser.pick.some(
    (item) => item.story?.id === story.id
  )
  const followingMembers = new Set(
    currentUser.following.map((element) => element.id)
  )
  const followingWhoPicked = story?.pick.filter((pick) =>
    followingMembers.has(pick.member.id)
  )

  const followingWhoCommented = story?.comment.filter((comment) =>
    followingMembers.has(comment.member.id)
  )

  const actionData = processActions(followingWhoPicked, followingWhoCommented)
  const storyPicksWithoutActions = story?.pick.filter(
    (item) =>
      !actionData?.picksData.some((pick) => pick.member.id === item.member.id)
  )
  const actionDataPicks = actionData?.picksData || []
  const storyPickFiltered = [
    ...actionDataPicks,
    ...storyPicksWithoutActions,
  ].slice(0, 4)

  if (!story) {
    return null
  }

  return (
    <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white drop-shadow sm:rounded-md">
      <div className="flex items-center justify-between px-5 py-3">
        <FeedLatestAction actions={actionData} />
        <button>
          <Icon iconName="icon-more-horiz" size="l" />
        </button>
      </div>
      {story?.og_image ? (
        <div className="aspect-[2/1] overflow-hidden bg-multi-layer-light">
          <Image
            src={story.og_image}
            alt={story.title}
            width={600}
            height={300}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
      ) : null}
      <div className="px-8 pb-6 pt-3">
        <h4 className="body-3 mb-1 text-primary-500">{story?.source?.title}</h4>
        <h2 className="title-1 line-clamp-2 mb-2 break-words">
          {story?.title}
        </h2>
        <div className="footnote mb-4 flex items-center text-primary-500">
          <Icon iconName="icon-chat-bubble" size="s" />
          <div className="pl-0.5">{story?.commentCount}</div>
          <Icon iconName="icon-dot" size="s" />
          <div>
            <span>{timeDifference(story?.published_date)}</span>
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
              {storyPickFiltered.map((data, index) => (
                <div key={data.member.id} className={`${avatarLayer[index]}`}>
                  {renderAvatar(data.member, 28)}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <span className="pr-1 text-primary-700">{story.pick.length}</span>
              <span>人精選</span>
            </div>
          </div>
          <FeedPick isFeedPicked={isStoryPickedByCurrentUser} />
        </div>
        {actionData?.feedComment.isShowComment &&
        actionData.feedComment.comment ? (
          <FeedComment comment={actionData.feedComment.comment} />
        ) : null}
      </div>
    </div>
  )
}
export const avatarLayer = ['z-[4]', 'z-[3]', 'z-[2]', 'z-[1]']
export const renderAvatar = (member: Member, px: number) => {
  const avatarVariants: { [key: number]: string } = {
    28: 'h-[28px] w-[28px]',
    44: 'h-11 w-11',
  }
  return member.avatar ? (
    <Image
      className={`inline-block ${avatarVariants[px]} rounded-full bg-white ring-2 ring-white`}
      src={member.avatar}
      width={px}
      height={px}
      alt={`${member.id}-avatar`}
    />
  ) : (
    <Icon iconName="icon-avatar-default" size={{ width: px, height: px }} />
  )
}

export const timeDifference = (date: string) => {
  const differenceInMilliseconds = Date.now() - new Date(date).getTime()
  const differenceInMinutes = differenceInMilliseconds / MINUTE
  const differenceInHours = differenceInMilliseconds / HOUR
  const differenceInDays = differenceInMilliseconds / DAY

  if (differenceInMilliseconds < HOUR) {
    return Math.floor(differenceInMinutes) + ' 分鐘前'
  } else if (differenceInMilliseconds < 24 * HOUR) {
    return Math.floor(differenceInHours) + ' 小時前'
  } else if (differenceInMilliseconds < 7 * DAY) {
    return Math.floor(differenceInDays) + ' 天前'
  } else {
    const targetDate = new Date(date)
    const currenYear = new Date().getFullYear()
    const year = targetDate.getFullYear()
    const month = String(targetDate.getMonth() + 1).padStart(2, '0')
    const day = String(targetDate.getDate()).padStart(2, '0')

    if (year === currenYear) {
      return `${month}/${day}`
    } else {
      return `${year}/${month}/${day}`
    }
  }
}

export type LatestAction = ReturnType<typeof processActions>

function processActions(picks: Story['pick'], comments: Story['comment']) {
  const picksNum = picks.length
  const commentsNum = comments.length
  let slicedPicks = picks.slice(0, 2)
  const slicedComments = comments.slice(0, 2)

  function createActions(
    isShowComment: boolean,
    comment: Story['comment'][number] | undefined
  ) {
    return {
      picksNum: picksNum,
      commentsNum: commentsNum,
      picksData: slicedPicks,
      commentsData: slicedComments,
      feedComment: {
        isShowComment: isShowComment,
        comment: comment,
      },
    }
  }

  if (picksNum > 0 && commentsNum > 0) {
    const pickTime = new Date(picks[0].createdAt).getTime()
    const commentTime = new Date(comments[0].createdAt).getTime()
    if (pickTime > commentTime) {
      const isMemberPickAndComment = comments.find(
        (item) => item.member.id === picks[0].member.id
      )
      return createActions(!!isMemberPickAndComment, isMemberPickAndComment)
    } else {
      const matchingPickIndex = picks.findIndex(
        (item) => item.member.id === comments[0].member.id
      )
      if (matchingPickIndex === 1) {
        slicedPicks = slicedPicks.reverse()
      } else if (matchingPickIndex > 1) {
        const matchingPick = picks[matchingPickIndex]
        slicedPicks = [matchingPick, slicedPicks[0]]
      }
      return createActions(matchingPickIndex > -1, comments[0])
    }
  } else if (picksNum > 0) {
    return createActions(false, undefined)
  } else if (commentsNum > 0) {
    return createActions(true, comments[0])
  } else {
    return null
  }
}
