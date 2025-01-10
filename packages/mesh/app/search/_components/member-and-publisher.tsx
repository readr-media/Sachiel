import { useRouter } from 'next/navigation'

import FollowButton from '@/app/social/_components/follow-button'
import Avatar from '@/components/story-card/avatar'
import { useUser } from '@/context/user'
import { type SearchResults } from '@/utils/data-schema'

import FollowPublisherButton from './follow-publisher-button'

export default function MemberAndPublisher({
  query,
  memberResult,
  publisherResult,
}: {
  query: string
  memberResult: SearchResults['member']
  publisherResult: SearchResults['publisher']
}) {
  const { user } = useUser()
  const router = useRouter()
  const isNoResult = !memberResult.length && !publisherResult.length

  return (
    <>
      {memberResult.length ? (
        <>
          <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">人物</h2>
          {memberResult.map((m, idx) => (
            <div
              key={m.id}
              className={`flex flex-row border-b-[0.5px] border-primary-200 py-5 last:border-b-0 ${
                idx === 0 ? 'pb-5 pt-0' : 'py-5'
              }`}
            >
              <Avatar size="l" src={m.avatar} extra="shrink-0" />
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-col pl-2">
                  <p
                    className="subtitle-1 hover:cursor-pointer hover-or-active:underline"
                    onClick={() => router.push(`/profile/member/${m.customId}`)}
                  >
                    {m.name}
                  </p>
                  <p className="body-3 text-primary-500">{m.customId}</p>
                </div>
                {m.id === user.memberId ? null : (
                  <div className="shrink-0">
                    <FollowButton followingId={m.id} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </>
      ) : null}
      {publisherResult.length ? (
        <>
          <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">媒體</h2>
          {publisherResult.map((p, idx) => (
            <div
              key={p.id}
              className={`flex flex-row border-b-[0.5px] border-primary-200 py-5 last:border-b-0 ${
                idx === 0 ? 'pb-5 pt-0' : 'py-5'
              }`}
            >
              <Avatar size="l" src={p.logo} extra="shrink-0" />
              <div className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-col pl-2">
                  <p
                    className="subtitle-1 hover:cursor-pointer hover-or-active:underline"
                    onClick={() =>
                      router.push(`/profile/publisher/${p.customId}`)
                    }
                  >
                    {p.title}
                  </p>
                  <p className="body-3 text-primary-500">
                    {p.followerCount} 人追蹤
                  </p>
                </div>
                <div className="shrink-0">
                  <FollowPublisherButton
                    publisherId={p.id}
                    publisherName={p.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : null}

      {isNoResult ? (
        <p className="pt-3 text-primary-500 sm:pt-5">
          找不到包含「
          <span className="text-primary-700">{query}</span>
          」的個人檔案，請換個關鍵字，再試一次。
        </p>
      ) : null}
    </>
  )
}
