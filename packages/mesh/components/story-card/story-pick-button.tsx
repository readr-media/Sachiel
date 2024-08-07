'use client'

import { useRouter } from 'next/navigation'

import { addPick, removePick } from '@/app/actions/pick'
import Button from '@/components/button'
import { useUser } from '@/context/user'
import { debounce } from '@/utils/performance'

export default function StoryPickButton({ storyId }: { storyId: string }) {
  const router = useRouter()
  const { user, setUser } = useUser()
  const memberId = user?.memberId
  const isStoryPicked =
    user?.picks.findIndex((pickInfo) => pickInfo.story?.id === storyId) !== -1

  const handleClickPick = debounce(async () => {
    if (!memberId) {
      router.push('/login')
      return
    }

    if (isStoryPicked) {
      // TODO: simplify the mutation
      setUser((user) => {
        return {
          ...user,
          picks: user.picks.filter((pick) => pick.story?.id !== storyId),
        }
      })
      const removePickResponse = await removePick({ memberId, storyId })
      if (!removePickResponse) {
        // TODO: error toast
        // TODO: simplify the mutation
        setUser((user) => {
          return {
            ...user,
            picks: [...user.picks, { story: { id: storyId } }],
          }
        })
      }
    } else {
      // TODO: simplify the mutation
      setUser((user) => {
        return {
          ...user,
          picks: [...user.picks, { story: { id: storyId } }],
        }
      })
      const addPickResponse = await addPick({ memberId, storyId })
      if (!addPickResponse) {
        // TODO: error toast
        // TODO: simplify the mutation
        setUser((user) => {
          return {
            ...user,
            picks: user.picks.filter((pick) => pick.story?.id !== storyId),
          }
        })
      }
    }
  })

  return (
    <Button
      size="sm"
      color="white"
      text="精選"
      icon={{ iconName: 'icon-star-primary', size: 's' }}
      onClick={handleClickPick}
      activeState={{
        isActive: isStoryPicked,
        activeText: '已精選',
        activeIcon: { iconName: 'icon-star-white', size: 's' },
      }}
    />
  )
}
