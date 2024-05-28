import Image from 'next/image'

import Icon from '@/components/icon'
import { DAY, HOUR, MINUTE } from '@/constants/time-unit'
import type {
  GetUserFollowingResponse,
  Member,
  Story,
} from '@/graphql/query/get-user-following'

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
  const storyPicksAndComments = processStoryPicksAndComments(
    followingWhoPicked,
    followingWhoCommented
  )

  const latestAction = checkLatestAction(storyPicksAndComments)

  const avatarLayer = ['z-[4]', 'z-[3]', 'z-[2]', 'z-[1]']

  if (!story) {
    return null
  }

  return (
    <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white drop-shadow sm:rounded-md">
      <div className="flex items-center justify-between px-5 py-3">
        <FeedLatestAction actions={storyPicksAndComments} />
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
        <h1 className="title-1 line-clamp-2 mb-2 break-words">
          {story?.title}
        </h1>
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
              {storyPicksAndComments.picks?.slice(0, 4).map((data, index) => (
                <div key={data.member.id} className={`${avatarLayer[index]}`}>
                  {renderAvatar(data.member, 28)}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <span className="pr-1 text-primary-700">
                {followingWhoPicked.length}
              </span>
              <span>人精選</span>
            </div>
          </div>
          <FeedPick isFeedPicked={isStoryPickedByCurrentUser} />
        </div>
        {latestAction.isShowComment && latestAction.comment ? (
          <FeedComment comment={latestAction.comment} />
        ) : null}
      </div>
    </div>
  )
}

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

function processStoryPicksAndComments(
  picks: Story['pick'],
  comments: Story['comment']
): {
  actionBy: 'single' | 'multiple'
  picks: Story['pick']
  comments: Story['comment']
  latestAction: Story['pick'][number] | Story['comment'][number]
} {
  const sortedPicksAndComments = [...picks, ...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  if (sortedPicksAndComments.length === 1) {
    return {
      actionBy: 'single',
      picks: picks,
      comments: comments,
      latestAction: sortedPicksAndComments[0],
    }
  } else if (
    sortedPicksAndComments.length === 2 &&
    picks.length === 1 &&
    comments.length === 1 &&
    picks[0].member.id === comments[0].member.id
  ) {
    return {
      actionBy: 'single',
      picks: picks,
      comments: comments,
      latestAction: sortedPicksAndComments[0],
    }
  } else {
    const sortedPicks = picks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    const sortedComments = comments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return {
      actionBy: 'multiple',
      picks: sortedPicks,
      comments: sortedComments,
      latestAction: sortedPicksAndComments[0],
    }
  }
}

export type LatestAction = ReturnType<typeof processStoryPicksAndComments>

function checkLatestAction(data: LatestAction) {
  const { latestAction, picks, comments } = data

  if (picks.length === 0 && comments.length === 1) {
    return {
      isShowComment: true,
      comment: comments[0],
    }
  }

  switch (latestAction.__typename) {
    case 'Pick': {
      const PickAndComment = comments?.find(
        (item) => item.member.id === latestAction.member.id
      )

      return {
        isShowComment: !!PickAndComment,
        comment: PickAndComment || null,
      }
    }
    case 'Comment': {
      const CommentAndPick = picks?.find(
        (item) => item.member.id === latestAction.member.id
      )

      return {
        isShowComment: !!CommentAndPick,
        comment: comments[0],
      }
    }
    default:
      return {
        isShowComment: false,
        comment: null,
      }
  }
}
