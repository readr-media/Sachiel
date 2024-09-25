import { useUser } from '@/context/user'
import type { CategoryStory, DailyStory, Story } from '@/types/homepage'

// This hook handles the display of picks for homepage
export function useDisplayPicks(story: CategoryStory | DailyStory | Story) {
  const { user } = useUser()
  const isStoryPicked = user.pickStoryIds.has(story.id)

  let displayPicks = story.picks.filter(
    (pick) => pick.member?.id !== user.memberId
  )
  let displayPicksCount = 0

  if ('picksCount' in story) {
    displayPicksCount = story.picksCount
  } else if ('pickCount' in story) {
    displayPicksCount = story.pickCount
  }

  if (isStoryPicked) {
    displayPicks = [
      ...displayPicks,
      { member: { id: user.memberId, name: user.name, avatar: user.avatar } },
    ]
    displayPicksCount++
  }

  return { displayPicks, displayPicksCount }
}
