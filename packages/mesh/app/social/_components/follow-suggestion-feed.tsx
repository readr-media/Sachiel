import type { CommonFollowingMembers } from '../page'
import FollowButton from './follow-button'
import RenderAvatar from './render-avatar'

export default function FollowSuggestionFeed({
  suggestedFollowers,
}: {
  suggestedFollowers: CommonFollowingMembers[]
}) {
  return (
    <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white px-5 py-4 drop-shadow sm:rounded-md lg:hidden">
      <h2 className="list-title pb-3 text-primary-700 sm:pb-1">推薦追蹤</h2>
      <div className="flex h-[210px] flex-row gap-3 overflow-x-auto sm:h-[345px] sm:flex-col sm:gap-0">
        {suggestedFollowers?.map((user, index) => {
          return (
            <div
              key={user.id}
              className="rounded-md border border-primary-200 px-3 pt-3 pb-4 sm:border-0 sm:p-0"
            >
              <div className="flex h-[180px] w-[124px] flex-col items-center gap-3 sm:h-[68px] sm:w-full sm:flex-row sm:py-3">
                <RenderAvatar src={user.avatar} px={64} />
                <div className="flex flex-col justify-center gap-3 sm:w-full sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col items-center gap-1 sm:items-start sm:gap-0.5">
                    <p className="subtitle-2 text-primary-700">{user.name}</p>
                    <p className="caption-1 text-center text-primary-500 sm:text-left">
                      <span>{user.followedBy}</span>
                      及其他<span> {user.followerCount} </span>
                      的追蹤對象
                    </p>
                  </div>
                  <FollowButton id={user.id} />
                </div>
              </div>
              {index !== suggestedFollowers.length - 1 ? (
                <div className="hidden border-t-[0.5px] sm:block"></div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
