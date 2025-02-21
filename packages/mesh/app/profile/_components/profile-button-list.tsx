'use client'
import type { ButtonColor } from '@/components/button'
import Button from '@/components/button'

export type ProfileButton = {
  text: {
    default: string
    isActive: string
  }
  color?: ButtonColor
  isActive: boolean
  clickFn?: () => void
  component?: React.ReactNode
}
type ProfileButtonListProps = {
  buttonList: ProfileButton[]
}

const ProfileButtonList: React.FC<ProfileButtonListProps> = ({
  buttonList,
}) => {
  return (
    <div className="button-large mt-6 flex w-full flex-col gap-2 sm:order-3 md:flex-row">
      {buttonList.map((button, index) => {
        // NOTE: 如果有自帶component優先使用
        if (button.component)
          return (
            <div key={index} className="flex *:h-full *:flex-1 sm:w-[180px]">
              {button.component}
            </div>
          )
        return (
          <div key={index} className="flex *:flex-1 sm:w-[180px]">
            <Button
              onClick={button.clickFn ? button.clickFn : () => {}}
              text={button.text.default}
              size="md"
              color={button.color ?? 'white'}
              activeState={{
                isActive: button.isActive,
                activeText: button.text.isActive,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ProfileButtonList
