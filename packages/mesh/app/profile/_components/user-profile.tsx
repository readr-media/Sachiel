import Avatar from '@/components/story-card/avatar'
import { type UserType } from '@/types/profile'

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
  const userPickOrPickedSubtitle = (userType: string) => {
    if (userType === 'publisher') {
      return (
        <p className="footnote sm:profile-subtitle text-primary-500">
          本週獲得
          <span className="text-primary-800">{pickedCount}</span>
          次精選
        </p>
      )
    }
    return (
      <p className="footnote sm:profile-subtitle text-primary-500">
        本週精選了
        <span className="text-primary-800">{pickCount}</span>
        篇文章
      </p>
    )
  }
  return (
    <>
      <section className="flex w-full gap-4">
        <Avatar
          size="xl"
          src={avatar}
          extra="sm:w-20 sm:h-20 object-cover"
          isRound={userType !== 'publisher'}
        />
        <div className="flex flex-col justify-center gap-1">
          <p className="profile-title  sm:title-1 text-primary-700">{name}</p>
          {userPickOrPickedSubtitle(userType)}
        </div>
      </section>
      <p className="body-3 sm:body-2 mt-3 line-clamp-6 w-full whitespace-pre text-primary-500 sm:mt-4">
        {intro}
      </p>
    </>
  )
}

export default UserProfile
