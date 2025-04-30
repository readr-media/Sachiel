import {
  addFollowPublisher,
  removeFollowPublisher,
} from '@/app/actions/follow-publisher'
import TOAST_MESSAGE from '@/constants/toast'
import { useToast } from '@/context/toast'
import { useUser } from '@/context/user'
import { debounce } from '@/utils/performance'

import { useCustomTranslation } from './use-custom-translation'
import useRedirectLogin from './use-redirect-login'

type UseFollowPublisherProps = {
  publisherId: string
  publisherName: string
}

const useFollowPublisher = ({
  publisherId,
  publisherName,
}: UseFollowPublisherProps) => {
  const { t } = useCustomTranslation()
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
          text: t(
            `Others.toast.${TOAST_MESSAGE.unfollowMemberFailed}`,
            '取消追蹤失敗，請重新嘗試'
          ),
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
          text: t(
            `Others.toast.${TOAST_MESSAGE.followMemberFailed}`,
            '追蹤失敗，請重新嘗試'
          ),
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
