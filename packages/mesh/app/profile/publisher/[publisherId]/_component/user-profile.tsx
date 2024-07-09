import Image from 'next/image'

type UserProfileProps = {
  name: string
  avatar: string
  intro: string
}
const UserProfile: React.FC<UserProfileProps> = ({ name, avatar, intro }) => {
  return (
    <>
      <section className="flex w-full items-center gap-4">
        <div
          className="relative aspect-square w-16 overflow-hidden rounded-lg
          sm:w-20"
        >
          <Image
            alt={`${name}'s avatar`}
            src={avatar || '/images/default-avatar-image.png'}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <p className="profile-title h-[46px] text-primary-700">{name}</p>
        </div>
      </section>
      <p className="mt-3 line-clamp-6 w-full text-[14px] font-normal leading-[21px] text-primary-500 sm:mt-4">
        {intro}
      </p>
    </>
  )
}

export default UserProfile
