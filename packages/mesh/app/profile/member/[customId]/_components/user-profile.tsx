import Image from 'next/image'

import { userType } from './member-page'

type UserProfileProps = {
  name: string
  pickCount: number
  avatar: string
  userType: userType
  intro: string
}
const UserProfile: React.FC<UserProfileProps> = ({
  name,
  pickCount,
  avatar,
  intro,
}) => {
  return (
    <>
      <section className="flex w-full gap-4">
        <div className="relative aspect-square w-16 overflow-hidden rounded-full sm:w-20">
          <Image
            alt={`${name}'s avatar`}
            src={avatar || '/images/default-avatar-image.png'}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <p className="profile-title  text-primary-700">{name}</p>
          <p className="footnote sm:profile-subtitle text-primary-500">
            本週精選了
            <span className="text-primary-800"> {pickCount} </span>
            篇文章
          </p>
        </div>
      </section>
      <p className="body-3 sm:body-2 mt-3 line-clamp-6 w-full text-primary-500 sm:mt-4">
        {intro}
      </p>
    </>
  )
}

export default UserProfile
