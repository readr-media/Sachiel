import Image from 'next/image'

type UserAvatarProps = {
  name: string
  avatar: string
  userType: string
}

const UserAvatar = ({ name, avatar, userType }: UserAvatarProps) => (
  <div
    className={`relative aspect-square w-16 overflow-hidden ${
      userType === 'publisher' ? 'rounded-lg' : 'rounded-full'
    } sm:w-20`}
  >
    <Image
      alt={`${name}'s avatar`}
      src={avatar || '/images/default-avatar-image.png'}
      fill
      className="object-cover"
    />
  </div>
)

export default UserAvatar
