'use client'
import Button from '@/components/button'

type ProfileButton = {
  text: {
    default: string
    isActive: string
  }
  primary?: boolean
  isActive: boolean
  clickFn?: () => void
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
        <div key={index} className="flex *:flex-1 sm:w-[180px]">
          <Button
            onClick={button.clickFn ? button.clickFn : () => {}}
            text={button.text.default}
            size="md"
            color={button.primary ? 'custom-blue' : 'white'}
            activeState={{
              isActive: button.isActive,
              activeText: button.text.isActive,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default ProfileButtonList
