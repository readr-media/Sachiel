'use client'
import Button from '@/components/button'

type ProfileButton = {
  text: string
  primary?: boolean
}
type ProfileButtonListProps = {
  buttonList: ProfileButton[]
}

const ProfileButtonList: React.FC<ProfileButtonListProps> = ({
  buttonList,
}) => {
  return (
    <div className="button-large mt-6 flex w-full flex-col gap-2 sm:order-3 md:flex-row">
      {buttonList.map((button, index) => (
        <div key={index} className="sm:w-[180px]">
          <Button
            onClick={() => {}}
            text={button.text}
            size="md"
            color={button.primary ? 'custom-blue' : 'white'}
          />
        </div>
      ))}
    </div>
  )
}

export default ProfileButtonList
