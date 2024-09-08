import CategoryStorySection from './_component/category-story/section'
import DailyHighlightSection from './_component/daily-highlight/section'
import MostLikedCommentSection from './_component/most-liked-comments/section'
import MostPickedStorySection from './_component/most-picked-story'
import ReadrStorySection from './_component/readr-story'
import TopCollectorSection from './_component/top-collector/section'
import TopPublisherSection from './_component/top-publisher/section'
import { getCurrentUser } from './actions/auth'
import { fetchMemberInfo } from './actions/get-homepage'

export default async function Home() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  const memberData = memberId && (await fetchMemberInfo(memberId))
  let followingMembers: Set<string> = new Set()

  if (memberData) {
    followingMembers = new Set(
      memberData.member?.followingMembers?.map((member) => member.id ?? '')
    )
  }

  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <DailyHighlightSection followingMembers={followingMembers} />
      {/* @ts-expect-error Server Component */}
      <MostPickedStorySection followingMembers={followingMembers} />
      {/* @ts-expect-error Server Component */}
      <CategoryStorySection followingMembers={followingMembers} />
      {/* @ts-expect-error Server Component */}
      <TopCollectorSection followingMembers={followingMembers} />
      {/* @ts-expect-error Server Component */}
      <MostLikedCommentSection />
      {/* @ts-expect-error Server Component */}
      <ReadrStorySection followingMembers={followingMembers} />
      {/* @ts-expect-error Server Component */}
      <TopPublisherSection />
    </main>
  )
}
