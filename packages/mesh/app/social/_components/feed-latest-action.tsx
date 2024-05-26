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
    comments: Comment[] | null
    latestAction: Pick | Comment
  }
}

export default function FeedLatestAction({ actions }: FeedLatestActionProps) {
  const avatarLayer = ['z-[4]', 'z-[3]', 'z-[2]', 'z-[1]']
  const { picks = [], comments = [], actionBy } = actions

  if (actionBy === 'single') {
    const member = picks[0].member
    return (
      <div className="flex items-center gap-2">
        {renderAvatar(member, 28)}
        <div className="body-3 text-primary-500">
          <span className="text-primary-700">{member.name}</span>
          精選了這篇
        </div>
      </div>
    )
  } else if (actionBy === 'multiple') {
    return (
      <div className="flex items-center gap-2">
        <div className="flex -space-x-1 overflow-hidden">
          {picks.length === 2
            ? picks.slice(0, 2).map((data, index) => (
                <div key={data.member.id} className={`${avatarLayer[index]}`}>
                  {renderAvatar(data.member, 28)}
                </div>
              ))
            : picks.length > 2 && (
                <div key={picks[0].member.id} className={`${avatarLayer[0]}`}>
                  {renderAvatar(picks[0].member, 28)}
                </div>
              )}
        </div>
        <div className="body-3 text-primary-500">
          <span className="text-primary-700">{picks[0].member.name}</span>
          {picks.length === 2 ? (
            <>
              及<span className="text-primary-700">{picks[1].member.name}</span>
              都精選了這篇
            </>
          ) : picks.length > 2 ? (
            <>
              及其他
              <span className="text-primary-700"> {picks.length - 1} </span>
              人都精選了這篇
            </>
          ) : null}
        </div>
      </div>
    )
  }
  return null
}
