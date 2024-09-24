'use client'

import { useRouter } from 'next/navigation'

import { addPick, removePick } from '@/app/actions/pick'
import type { ButtonColor } from '@/components/button'
import Button from '@/components/button'
import { useUser } from '@/context/user'
import { debounce } from '@/utils/performance'

export default function StoryPickButton({
  storyId,
  color = 'white',
}: {
  storyId: string
  color?: ButtonColor
}) {
  const router = useRouter()
  const { user, setUser } = useUser()
  const memberId = user.memberId
  const isStoryPicked = user.pickStoryIds.has(storyId)

  const handleClickPick = debounce(async () => {
    if (!memberId) {
      router.push('/login')
      return
    }

    const newPickStoryIds = new Set(user.pickStoryIds)
    if (isStoryPicked) {
      // TODO: simplify the mutation
      newPickStoryIds.delete(storyId)
      setUser((user) => {
        return {
          ...user,
          pickStoryIds: newPickStoryIds,
        }
      })
      const removePickResponse = await removePick({ memberId, storyId })
      if (!removePickResponse) {
        // TODO: error toast
        // TODO: simplify the mutation
        newPickStoryIds.add(storyId)
        setUser((user) => {
          return {
            ...user,
            pickStoryIds: newPickStoryIds,
          }
        })
      }
    } else {
      // TODO: simplify the mutation
      newPickStoryIds.add(storyId)
      setUser((user) => {
        return {
          ...user,
          pickStoryIds: newPickStoryIds,
        }
      })
      const addPickResponse = await addPick({ memberId, storyId })
      if (!addPickResponse) {
        // TODO: error toast
        // TODO: simplify the mutation
        newPickStoryIds.delete(storyId)
        setUser((user) => {
          return {
            ...user,
            pickStoryIds: newPickStoryIds,
          }
        })
      }
    }
  })

  return (
    <Button
      size="sm"
      color={color}
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
