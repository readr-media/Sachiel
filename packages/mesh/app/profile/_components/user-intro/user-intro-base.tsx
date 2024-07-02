import { ReactNode } from 'react'

import type { ButtonConfig, TabItem, UserIntroProps } from './types'
import UserAvatar from './user-avatar'
import UserStatusList from './user-status-list'

type UserIntroBaseProps = UserIntroProps & {
  userStatusList: TabItem[]
  buttons: ButtonConfig[]
  children?: ReactNode
}

const UserIntroBase = ({
  avatar,
  name,
  intro,
  userType,
  userStatusList,
  buttons,
  children,
}: UserIntroBaseProps) => (
  <div className="flex max-h-[calc(100%_-_152px)] flex-col items-center px-5 pb-8 pt-6">
    <section className="flex w-full gap-4">
      <UserAvatar name={name} avatar={avatar} userType={userType} />
      <div className="flex flex-col justify-center gap-1">
        <p className="text-lg font-bold leading-6 text-primary-700 sm:text-xl sm:font-medium sm:leading-7">
          {name}
        </p>
        {children}
      </div>
    </section>
    <p className="mt-6 line-clamp-6 w-full text-[14px] font-normal leading-[21px] text-primary-500 sm:mt-4">
      {intro}
    </p>
    <div className="mt-6 flex w-full flex-col gap-2 text-base font-normal leading-[22.4px] sm:order-3 md:flex-row">
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`flex h-12 w-full items-center justify-center rounded-md border sm:w-[180px] ${
            button.primary
              ? 'border-custom-blue bg-custom-blue text-white'
              : 'border-[#000928]'
          }`}
        >
          {button.text}
        </button>
      ))}
    </div>
    <UserStatusList userStatusList={userStatusList} />
  </div>
)
export default UserIntroBase
