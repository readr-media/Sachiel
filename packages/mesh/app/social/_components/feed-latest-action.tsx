import type { Comment, Member } from '@/types/graphql'

import { renderAvatar } from './feed'

type Pick = {
  createdAt: string
  member: Member
  __typename: 'Pick'
}

type FeedLatestActionProps = {
  actions: {
    actionBy: 'single' | 'multiple'
    picks: Pick[]
    comments: Comment[]
    latestAction: Pick | Comment
  }
}

export default function FeedLatestAction({ actions }: FeedLatestActionProps) {
  const avatarLayer = ['z-[4]', 'z-[3]', 'z-[2]', 'z-[1]']
  const { picks = [], comments = [], actionBy } = actions

  if (actionBy === 'single') {
    return (
      <>
        {picks.length !== 0 ? (
          <div className="flex items-center gap-2">
            {renderAvatar(picks[0].member, 28)}
            <div className="body-3 text-primary-500">
              <span className="text-primary-700">{picks[0].member.name}</span>
              精選了這篇
            </div>
          </div>
        ) : comments?.length !== 0 ? (
          <div className="flex items-center gap-2">
            {renderAvatar(comments[0].member, 28)}
            <div className="body-3 text-primary-500">
              <span className="text-primary-700">
                {comments[0].member.name}
              </span>
              在這篇文章留言
            </div>
          </div>
        ) : null}
      </>
    )
  } else if (picks.length === 0 && comments.length > 2) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {comments.slice(0, 2).map((data, index) => (
            <div key={data.member.id} className={`${avatarLayer[index]}`}>
              {renderAvatar(data.member, 28)}
            </div>
          ))}
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">{comments[0].member.name}</span>及
          <span className="text-primary-700">{comments[1].member.name}</span>
          在這篇文章留言
        </div>
      </div>
    )
  } else if (picks.length === 1 && comments.length > 2) {
    return (
      <div className="flex items-center gap-2">
        {renderAvatar(picks[0].member, 28)}
        <div className="body-3 text-primary-500">
          <span className="text-primary-700">{picks[0].member.name}</span>
          精選了這篇
        </div>
      </div>
    )
  } else if (picks.length === 2) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {picks.slice(0, 2).map((data, index) => (
            <div key={data.member.id} className={`${avatarLayer[index]}`}>
              {renderAvatar(data.member, 28)}
            </div>
          ))}
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">{picks[0].member.name}</span>及
          <span className="text-primary-700">{picks[1].member.name}</span>
          精選了這篇文章
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {renderAvatar(picks[0].member, 28)}
        </div>
        <div className="body-3 flex flex-row text-primary-500">
          <span className="text-primary-700">{picks[0].member.name}</span>及其他
          <span className="px-1 text-primary-700">{picks.length - 1}</span>
          精選了這篇文章
        </div>
      </div>
    )
  }
}
