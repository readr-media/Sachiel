import type { SocialStoryPicks } from '@/app/social/_components/feed'
import { useUser } from '@/context/user'
import type { CategoryStory, DailyStory, Story } from '@/types/homepage'

// This hook handles the display of picks for homepage
export function useDisplayPicks(
  story: CategoryStory | DailyStory | Story | SocialStoryPicks
) {
  const { user } = useUser()
  const isStoryPicked = user.pickStoryIds.has(story.id)
  const isUserInPicks = story.picks.some(
    (pick) => pick.member?.id === user.memberId
  )

  // If the user's data is in the JSON, filter it out first,
  // so it can be added later based on the isStoryPicked flag
  let displayPicks = story.picks.filter(
    (pick) => pick.member?.id !== user.memberId
  )
  let displayPicksCount =
    ('picksCount' in story ? story.picksCount : story.pickCount) -
    (isUserInPicks ? 1 : 0)

  if (isStoryPicked) {
    displayPicks = [
      ...displayPicks,
      { member: { id: user.memberId, name: user.name, avatar: user.avatar } },
    ]
    displayPicksCount++
  }

  return { displayPicks, displayPicksCount }
}
