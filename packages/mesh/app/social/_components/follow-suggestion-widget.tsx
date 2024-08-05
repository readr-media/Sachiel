import Link from 'next/link'

import Avatar from '@/components/story-card/avatar'

import type { SuggestedFollowers } from '../[id]/page'
import FollowButton from './follow-button'

export default function FollowSuggestionWidget({
  currentUserId,
  suggestedFollowers,
}: {
  currentUserId: string
  suggestedFollowers: SuggestedFollowers[]
}) {
  return (
    <div className="hidden grow px-5 lg:block">
      <div className="top-[calc(theme(height.header.sm)+20px)] hidden lg:fixed lg:block lg:w-[220px] xl:w-[360px]">
        <h2 className="list-title pb-1 text-primary-700">推薦追蹤</h2>
        {suggestedFollowers?.map((member, index) => (
          <div key={member.id}>
            <div className="flex flex-row items-center py-3">
              <Avatar src={member.avatar ?? ''} size="l" />
              <div className="flex w-full items-center justify-between">
                <div className="ml-3 flex-grow-0">
                  <p className="subtitle-2 mb-[2px] text-primary-700">
                    <Link href={`/profile/member/${member.customId}`}>
                      {member.name}
                    </Link>
                  </p>
                  <p className="caption-1 line-clamp-1 break-words text-primary-500">
                    {member.currentMemberFollowingMember !== '' ? (
                      <>
                        <span>{member.currentMemberFollowingMember}</span>
                        及其他<span> {member.followerCount} </span>
                        的追蹤對象
                      </>
                    ) : (
                      <>
                        有<span> {member.followerCount} </span>人正在追蹤
                      </>
                    )}
                  </p>
                </div>
                <div className="flex-shrink-0 lg:ml-4">
                  <FollowButton
                    currentUserId={currentUserId}
                    followingId={member.id}
                  />
                </div>
              </div>
            </div>
            {index !== suggestedFollowers.length - 1 ? (
              <div className="border-t-[0.5px]"></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
