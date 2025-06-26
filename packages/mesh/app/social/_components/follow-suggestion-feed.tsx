import Link from 'next/link'

import Icon from '@/components/icon'
import Avatar from '@/components/story-card/avatar'
import {
  type MongoDBResponse,
  type MostFollowersMember,
} from '@/utils/data-schema'

import useSuggestedFollowers from '../_hooks/use-suggested-followers'
import FollowButton from './follow-button'

export default function FollowSuggestionFeed({
  suggestedFollowers,
  isNoFollowings,
}: {
  suggestedFollowers: MongoDBResponse['members'] | MostFollowersMember[]
  isNoFollowings: boolean
}) {
  const { displaySuggestedFollowers, setPage, hasNextPage } =
    useSuggestedFollowers(suggestedFollowers)

  return (
    <div
      className={`flex w-screen min-w-[375px] flex-col bg-white px-5 py-4 ${
        isNoFollowings
          ? 'sm:max-w-[600px] sm:drop-shadow'
          : 'max-w-[600px] drop-shadow'
      } sm:rounded-md lg:hidden`}
    >
      <div className=" flex items-center justify-between pb-3 sm:pb-1">
        <h2 className="list-title text-primary-700">推薦追蹤</h2>
        <button
          className={`button flex h-6 items-center text-primary-500 ${
            !hasNextPage ? 'hidden' : ''
          }`}
          onClick={() => setPage((page) => page + 1)}
        >
          <Icon iconName="icon-refresh" size="l" />
          重新推薦
        </button>
      </div>
      <div className="flex h-[210px] flex-row gap-3 overflow-x-auto sm:h-[345px] sm:flex-col sm:gap-0">
        {displaySuggestedFollowers.map((member, index) => {
          return (
            <div
              key={member.id}
              className="rounded-md border border-primary-200 px-3 pb-4 pt-3 sm:border-0 sm:p-0"
            >
              <div className="flex h-[180px] w-[124px] flex-col items-center gap-3 sm:h-[68px] sm:w-full sm:flex-row sm:py-3">
                <Avatar src={member.avatar} size="xl" extra="sm:hidden" />
                <Avatar src={member.avatar} size="l" extra="hidden sm:block" />
                <div className="flex flex-col justify-center gap-3 sm:w-full sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col items-center gap-1 sm:items-start sm:gap-0.5">
                    <Link
                      href={`/profile/member/${member.customId}`}
                      className="subtitle-2 text-primary-700 hover-or-active:underline"
                    >
                      {member.name}
                    </Link>
                    <p className="caption-1 h-9 w-[124px] text-center text-primary-500 sm:h-[18px] sm:w-full sm:text-left">
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
                  <FollowButton
                    followingId={member.id}
                    gtmClassName="GTM-soc_click_user_follow"
                  />
                </div>
              </div>
              {index !== displaySuggestedFollowers.length - 1 ? (
                <div className="hidden border-t-[0.5px] sm:block"></div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
