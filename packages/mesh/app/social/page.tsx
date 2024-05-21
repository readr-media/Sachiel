import { getClient } from '@/apollo'
import Feed from '@/app/social/_components/feed'
import { GetUserFollowing } from '@/graphql/query/get-user-following'
import type { Member } from '@/types/graphql'

export default async function Page() {
  const userId = '175'
  const picksTakeFromEachFollowingMember = 10
  const feedsNumber = 20
  const currentUser = await fetchUserFollowing(
    userId,
    picksTakeFromEachFollowingMember
  )
  const processedPicksData = processPicks(currentUser.following, feedsNumber)
  const sortedPicksByPickTime = processedPicksData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <>
      {sortedPicksByPickTime.length === 0 ? (
        <div className="flex justify-center py-5">
          <div className="flex flex-col gap-4">
            <p>咦？這裡好像還缺點什麼...</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-10 py-5">
          <div className="flex flex-col gap-4">
            {sortedPicksByPickTime.slice(0, 2).map((pick) => (
              <Feed
                key={pick.id}
                story={pick.story}
                currentUser={currentUser}
              />
            ))}
            <div className="flex w-screen min-w-[375px] max-w-[600px] flex-col bg-white px-5 py-4 drop-shadow sm:rounded-md lg:hidden">
              <h2 className="list-title pb-3 text-primary-700 sm:pb-1">
                推薦追蹤
              </h2>
            </div>
            {sortedPicksByPickTime.slice(2).map((pick) => (
              <Feed
                key={pick.id}
                story={pick.story}
                currentUser={currentUser}
              />
            ))}
          </div>
          <div className="hidden grow flex-col lg:flex lg:max-w-[260px] xl:max-w-[400px]">
            <h2 className="list-title pb-1 text-primary-700">推薦追蹤</h2>
          </div>
        </div>
      )}
    </>
  )
}

async function fetchUserFollowing(memberId: string, picksTake: number) {
  const { data } = await getClient().query({
    query: GetUserFollowing,
    variables: { memberId, picksTake },
  })
  return data.member
}

function processPicks(followingMember: Member[], maxPicks: number) {
  const data = []
  const seenPickIds = new Set()

  let pickIndex = 0
  while (seenPickIds.size < maxPicks) {
    let foundNewPick = false

    for (const member of followingMember) {
      if (pickIndex < member.pick.length) {
        const pick = member.pick[pickIndex]
        if (!pick) continue
        if (pick.story && !seenPickIds.has(pick.story.id)) {
          data.push(pick)
          seenPickIds.add(pick.story.id)
          foundNewPick = true

          if (seenPickIds.size >= maxPicks) {
            return data
          }
        }
      }
    }

    if (!foundNewPick) {
      break
    }

    pickIndex++
  }

  return data
}
