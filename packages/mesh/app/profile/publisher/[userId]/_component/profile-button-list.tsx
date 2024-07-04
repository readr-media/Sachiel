import React from 'react'
type ProfileButton = {
  text: string
  primary?: boolean
}
type ProfileButtonLIstProps = {
  buttonList: ProfileButton[]
}

const ProfileButtonLIst: React.FC<ProfileButtonLIstProps> = ({
  buttonList,
}) => {
  return (
    <div className="mt-6 flex w-full flex-col gap-2 text-base font-normal leading-[22.4px] sm:order-3 md:flex-row">
      {buttonList.map((button, index) => (
        <button
          key={index}
          className=" flex h-12 w-full items-center justify-center rounded-md border sm:w-[180px]"
        >
          {button.text}
        </button>
      ))}
    </div>
  )
}

export default ProfileButtonLIst
