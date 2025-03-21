import { useTranslations } from 'next-intl'

import {
  addFollowPublisher,
  removeFollowPublisher,
} from '@/app/actions/follow-publisher'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import { debounce } from '@/utils/performance'

import useRedirectLogin from './use-redirect-login'

type UseFollowPublisherProps = {
  publisherId: string
  publisherName: string
}

const useFollowPublisher = ({
  publisherId,
  publisherName,
}: UseFollowPublisherProps) => {
  const toastT = useTranslations('Others.toast')
  const { user, setUser } = useUser()
  const { addToast } = useToast()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()

  const followingPublisherList = user.followingPublishers
  const isFollowing = !!followingPublisherList.find(
    (publisher) => publisher.id === publisherId
  )

  const handleFollowOnClick = debounce(async () => {
    if (detectIfShouldRedirectToLogin()) {
      return
    }

    const followPublisherArgs = {
      memberId: user.memberId,
      publisherId,
    }

    if (isFollowing) {
      const response = await removeFollowPublisher(followPublisherArgs)
      if (!response) {
        addToast({
          status: 'fail',
          text: toastT(TOAST_MESSAGE.unfollowMemberFailed),
        })
        throw new Error('Failed to unlike comment')
      }
      setUser((prev) => {
        return {
          ...prev,
          followingPublishers: prev.followingPublishers.filter(
            (publisher) => publisher.id !== publisherId
          ),
        }
      })
    } else {
      const response = await addFollowPublisher(followPublisherArgs)
      if (!response) {
        addToast({
          status: 'fail',
          text: toastT(TOAST_MESSAGE.followMemberFailed),
        })
        throw new Error('Failed to unlike comment')
      }
      setUser((prev) => {
        const newPublisher = {
          __typename: 'Publisher' as const,
          id: publisherId,
          title: publisherName,
        }
        return {
          ...prev,
          followingPublishers: [...prev.followingPublishers, newPublisher],
        }
      })
    }
  })

  return {
    isFollowing,
    handleFollowOnClick,
  }
}

export default useFollowPublisher
