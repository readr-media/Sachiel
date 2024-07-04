import Image from 'next/image'

type UserProfileProps = {
  name: string
  pickCount: number
  avatar: string
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
        {/* title */}
        <div className="flex flex-col justify-center gap-1">
          <p className="text-lg font-bold leading-6 text-primary-700 sm:text-xl sm:font-medium sm:leading-7">
            {name}
          </p>
          <p className="text-[13px] font-normal leading-[19.5px] text-primary-500 sm:text-sm sm:leading-[14px]">
            本週精選了
            <span className="text-primary-800"> {pickCount} </span>
            篇文章
          </p>
        </div>
      </section>
      {/* intro */}
      <p className="mt-3 line-clamp-6 w-full text-[14px] font-normal leading-[21px] text-primary-500 sm:mt-4">
        {intro}
      </p>
    </>
  )
}

export default UserProfile
