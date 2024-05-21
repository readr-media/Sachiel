import Image from 'next/image'

import Icon from '@/components/icon'
import type { Comment, Member, Story, User } from '@/types/graphql'

import FeedComment from './feed-comment'
import FeedPick from './feed-pick'

type Pick = {
  createdAt: string
  member: Member
  __typename: 'Pick'
}

export default function Feed({
  story,
  currentUser,
}: {
  story: Story
  currentUser: User
}) {
  const isCurrentStoryPicked = currentUser.pick.some(
    (item) => item.story.id === story.id
  )
  const followingMember = new Set(
    currentUser.following.map((element) => element.id)
  )
  const followingWhoPicked = story?.pick.filter((pick) =>
    followingMember.has(pick.member.id)
  )
  const sortedFollowingWhoPicked = followingWhoPicked
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4)
  const followingWhoComments = story?.comment.filter((comment) =>
    followingMember.has(comment.member.id)
  )
  const latestActionData = getLatestActionData(
    followingWhoPicked,
    followingWhoComments
  )

  if (!story) {
    return null
  }

  return (
    <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white drop-shadow sm:rounded-md">
      <div className="flex items-center justify-between px-5 py-3">
        {latestActionData.length !== 0 ? (
          <div className="flex items-center">
            <div className="flex -space-x-1 overflow-hidden">
              {latestActionData.map((data) =>
                data.member.avatar ? (
                  <Image
                    key={data.member.id}
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                    src={data.member.avatar}
                    width={24}
                    height={24}
                    alt={`${data.member.id}-avatar`}
                  />
                ) : (
                  <Icon
                    key={data.member.id}
                    iconName="icon-avatar-default"
                    size="l"
                  />
                )
              )}
            </div>
            <div className="body-3 ml-2 text-primary-500">
              {latestActionData[0].__typename === 'Pick' ? (
                latestActionData.length === 1 ? (
                  <>
                    <span className="text-primary-700">
                      {latestActionData[0].member.name}
                    </span>
                    精選了這篇
                  </>
                ) : (
                  <>
                    <span className="text-primary-700">
                      {latestActionData[0].member.name}
                    </span>
                    及
                    <span className="text-primary-700">
                      {latestActionData[1].member.name}
                    </span>
                    都精選了這篇
                  </>
                )
              ) : (
                <>
                  <span className="text-primary-700">
                    {latestActionData[0].member.name}
                  </span>
                  在這篇留言
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="inline-block"></div>
        )}
        <button>
          <Icon iconName="icon-more-horiz" size="l" />
        </button>
      </div>
      {story?.og_image ? (
        <div className="aspect-[2/1] overflow-hidden bg-multi-layer-light">
          <Image
            src={story.og_image}
            alt={story.og_title}
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
        <h4 className="body-3 mb-1 text-primary-500">
          {story?.source?.customId}
        </h4>
        <h1 className="title-1 mb-2 break-words">{story?.og_title}</h1>
        <div className="footnote mb-4 flex items-center text-primary-500">
          <Icon iconName="icon-chat-bubble" size="s" />
          <div className="ml-0.5">{story?.commentCount}</div>
          <Icon iconName="icon-dot" size="s" />
          <div>
            <span>{timeDifference(story?.published_date)}</span>
          </div>
          <Icon iconName="icon-dot" size="s" />
          <div>付費文章</div>
          <Icon iconName="icon-dot" size="s" />
          <div>蓋板廣告</div>
        </div>
        <div className="footnote mb-4 flex h-8 justify-between text-primary-500">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1 overflow-hidden">
              {sortedFollowingWhoPicked.map((data) =>
                data.member.avatar ? (
                  <Image
                    key={data.member.id}
                    className="inline-block h-[28px] w-[28px] rounded-full ring-2 ring-white"
                    src={data.member.avatar}
                    width={28}
                    height={28}
                    alt={`${data.member.id}-avatar`}
                  />
                ) : (
                  <Icon
                    key={data.member.id}
                    iconName="icon-avatar-default"
                    size="l"
                  />
                )
              )}
            </div>
            <div className="flex items-center">
              <span className="pr-1 text-primary-700">
                {followingWhoPicked.length}
              </span>
              <span>人精選</span>
            </div>
          </div>
          <FeedPick isCurrentStoryPicked={isCurrentStoryPicked} />
        </div>
        {latestActionData[0].__typename === 'Comment' ? (
          <FeedComment comment={latestActionData[0]} />
        ) : null}
      </div>
    </div>
  )
}

export const timeDifference = (date: string) => {
  const timestamp = new Date(date).getTime()
  const differenceInHour = (Date.now() - timestamp) / (1000 * 60 * 60)
  if (differenceInHour < 1) {
    return Math.floor(differenceInHour * 60) + ' 分鐘前'
  } else if (differenceInHour < 24) {
    return Math.floor(differenceInHour) + ' 小時前'
  } else {
    return Math.floor(differenceInHour / 24) + ' 天前'
  }
}

function getLatestActionData(picks: Pick[], comments: Comment[]) {
  const combinedData = [...picks, ...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const latestAction = combinedData[0].__typename

  switch (latestAction) {
    case 'Pick': {
      const pickElements = combinedData
        .filter((item) => item.__typename === 'Pick')
        .slice(0, 2)
      return pickElements
    }

    case 'Comment': {
      const commentElement = combinedData.find(
        (item) => item.__typename === 'Comment'
      )
      return commentElement ? [commentElement] : []
    }

    default:
      return []
  }
}
