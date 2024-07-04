import { TabItem } from '@/utils/profile-tab'

type UserStatusListProps = {
  userStatusList: TabItem[]
}

const UserStatusList = ({ userStatusList }: UserStatusListProps) => (
  <ul className="mt-6 flex w-full items-center justify-center gap-6 sm:mt-4 sm:justify-start">
    {userStatusList.map(({ key, value }) => (
      <li
        key={key}
        className="relative flex h-[38px] w-[84px] flex-col items-center justify-between after:absolute after:-right-3 after:top-[9px] after:h-5 after:w-[0.5px] after:bg-primary-200 last:after:hidden sm:w-fit sm:flex-row sm:gap-1 sm:after:hidden"
      >
        <p className="text-base font-bold leading-5 text-primary-700">
          {value}
        </p>
        <p className="text-sm font-normal leading-[14px] text-primary-500 sm:text-base sm:leading-6">
          {key}
        </p>
      </li>
    ))}
  </ul>
)

export default UserStatusList
