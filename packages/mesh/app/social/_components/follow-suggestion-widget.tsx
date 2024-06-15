import Avatar from '@/components/story-card/avatar'

import type { SuggestedFollowers } from '../[id]/page'
import FollowButton from './follow-button'

export default function FollowSuggestionWidget({
  suggestedFollowers,
}: {
  suggestedFollowers: SuggestedFollowers[]
}) {
  return (
    <div className="hidden grow flex-col px-5 lg:flex lg:max-w-[260px] xl:max-w-[400px]">
      <h2 className="list-title pb-1 text-primary-700">推薦追蹤</h2>
      {suggestedFollowers?.map((user, index) => (
        <div key={user.id}>
          <div className="flex flex-row items-center py-3">
            <Avatar src={user.avatar ?? ''} size="l" />
            <div className="flex w-full items-center justify-between">
              <div className="ml-3 overflow-hidden lg:max-w-[96px] xl:max-w-[236px]">
                <p className="subtitle-2 mb-[2px] text-primary-700">
                  {user.name}
                </p>
                <p className="caption-1 break-words text-primary-500 line-clamp-1">
                  {user.currentMemberFollowingMember !== '' ? (
                    <>
                      <span>{user.currentMemberFollowingMember}</span>
                      及其他<span> {user.followerCount} </span>
                      的追蹤對象
                    </>
                  ) : (
                    <>
                      有<span> {user.followerCount} </span>人正在追蹤
                    </>
                  )}
                </p>
              </div>
              <FollowButton id={user.id} />
            </div>
          </div>
          {index !== suggestedFollowers.length - 1 ? (
            <div className="border-t-[0.5px]"></div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
