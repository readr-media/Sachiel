import Link from 'next/link'

import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import {
  type MongoDBResponse,
  type MostFollowersMember,
} from '@/utils/data-schema'

import useSuggestedFollowers from '../_hooks/use-suggested-followers'
import FollowButton from './follow-button'

export default function FollowSuggestionWidget({
  suggestedFollowers,
}: {
  suggestedFollowers: MongoDBResponse['members'] | MostFollowersMember[]
}) {
  const { displaySuggestedFollowers, setPage, hasNextPage } =
    useSuggestedFollowers(suggestedFollowers)

  return (
    <div className="hidden grow px-5 lg:block">
      <div className="top-[calc(theme(height.header.sm)+20px)] hidden lg:fixed lg:block lg:w-[220px] xl:w-[360px]">
        <div className=" flex justify-between pb-1">
          <h2 className="list-title text-primary-700">推薦追蹤</h2>
          <button
            className={`button mt-1 flex h-6 items-center text-primary-500 ${
              !hasNextPage ? 'hidden' : ''
            }`}
            onClick={() => setPage((page) => page + 1)}
          >
            <Icon iconName="icon-refresh" size="l" />
            重新推薦
          </button>
        </div>
        {displaySuggestedFollowers?.map((member, index) => (
          <div key={member.id}>
            <div className="flex flex-row items-center py-3">
              <Avatar
                src={member.avatar}
                size="l"
                ringColor="multi-layer-light"
              />
              <div className="flex w-full items-center justify-between">
                <div className="ml-3 grow-0">
                  <Link
                    href={`/profile/member/${member.customId}`}
                    className="subtitle-2 mb-[2px] text-primary-700 hover-or-active:underline"
                  >
                    {member.name}
                  </Link>
                  <p className="caption-1 line-clamp-1 break-words text-primary-500">
                    {'from' in member && member.from.name ? (
                      <>
                        <span>{member.from.name}</span>
                        及其他<span> {member.followerCount} </span>
                        人的追蹤對象
                      </>
                    ) : (
                      <>
                        有<span> {member.followerCount} </span>人正在追蹤
                      </>
                    )}
                  </p>
                </div>
                <div className="shrink-0 lg:ml-4">
                  <FollowButton
                    followingId={member.id}
                    gtmClassName="GTM-soc_click_user_follow"
                  />
                </div>
              </div>
            </div>
            {index !== displaySuggestedFollowers.length - 1 ? (
              <div className="border-t-[0.5px]"></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
