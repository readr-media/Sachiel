import { useState } from 'react'

import Avatar from '@/components/story-card/avatar'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { type UserType } from '@/types/profile'
import { debounce } from '@/utils/performance'

type UserProfileProps = {
  name: string
  pickCount?: number
  pickedCount?: number
  avatar: string
  userType: UserType
  intro: string
}
const UserProfile: React.FC<UserProfileProps> = ({
  name,
  pickCount,
  avatar,
  intro,
  userType,
  pickedCount,
}) => {
  const { t } = useCustomTranslation()
  const [showMore, setShowMore] = useState(false)
  const toggleShowMore = () => setShowMore((prev) => !prev)
  const handleOnClickShowMore = debounce(toggleShowMore)
  const userPickOrPickedSubtitle = (userType: string) => {
    if (userType === 'publisher') {
      return (
        <p className="footnote sm:profile-subtitle text-primary-500">
          {t('Pages.Profile.UserProfile-publisher-get-picks-1', '本週獲得')}
          <span className="text-primary-800">{pickedCount}</span>
          {t('Pages.Profile.UserProfile-publisher-get-picks-2', '次精選')}
        </p>
      )
    }
    return (
      <p className="footnote sm:profile-subtitle text-primary-500">
        {t('Pages.Profile.UserProfile-member-picks-1', '本週精選了')}
        <span className="text-primary-800">{pickCount}</span>
        {t('Pages.Profile.UserProfile-member-picks-2', '篇文章')}
      </p>
    )
  }
  return (
    <>
      <section className="flex w-full gap-4">
        <Avatar size="xl" src={avatar} extra="sm:w-20 sm:h-20 object-cover" />
        <div className="flex flex-col justify-center gap-1">
          <p className="profile-title  sm:title-1 text-primary-700">{name}</p>
          {userPickOrPickedSubtitle(userType)}
        </div>
      </section>
      <p
        className={`body-3 sm:body-2 mt-3 w-full whitespace-normal text-primary-500 sm:mt-4 ${
          showMore ? '' : 'line-clamp-6'
        }`}
        onClick={handleOnClickShowMore}
      >
        {intro}
      </p>
    </>
  )
}

export default UserProfile
