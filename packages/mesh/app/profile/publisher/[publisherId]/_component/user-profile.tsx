import Avatar from '@/components/story-card/avatar'

type UserProfileProps = {
  name: string
  avatar: string
  intro: string
}
const UserProfile: React.FC<UserProfileProps> = ({ name, avatar, intro }) => {
  return (
    <>
      <section className="flex w-full items-center gap-4">
        <Avatar size="xl" src={avatar} extra="sm:w-20 object-cover" />
        <div className="flex h-full flex-col items-center justify-center gap-1">
          <p className="profile-title h-[46px] text-primary-700">{name}</p>
        </div>
      </section>
      <p className="body-3 sm:body-2 mt-3 line-clamp-6 w-full text-primary-500 sm:mt-4">
        {intro}
      </p>
    </>
  )
}

export default UserProfile
