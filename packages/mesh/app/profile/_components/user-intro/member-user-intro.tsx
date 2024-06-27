import Image from 'next/image'

import { type TabItem } from './index'

type UserIntroProps = {
  name: string
  avatar: string
  intro: string
  pickCount: number | null
  userType?: string
  userStatusList: TabItem[]
}

const MemberUserIntro = ({
  avatar,
  name,
  pickCount,
  intro,
  userStatusList,
}: UserIntroProps) => {
  return (
    <div className="flex flex-col items-center px-5 pb-8 pt-6 sm:items-start md:px-[70px]">
      <section className="flex w-full gap-4">
        <div className="relative aspect-square w-16 overflow-hidden rounded-full sm:w-20">
          <Image
            alt={`${name}'s avatar`}
            src={avatar || '/images/default-avatar-image.png'}
            fill
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <p className=" text-lg font-bold leading-6 text-primary-700 sm:text-xl sm:font-medium sm:leading-7">
            {name}
          </p>
          <p className=" text-[13px] font-normal leading-[19.5px] text-primary-500 sm:text-sm sm:leading-[14px]">
            本週精選了<span className="text-primary-800"> {pickCount} </span>
            篇文章
          </p>
        </div>
      </section>
      <p className="mt-6 w-full text-[14px] font-normal leading-[21px] text-primary-500 sm:mt-4">
        {intro}
      </p>
      <div className="mt-6 flex w-full flex-col gap-2 text-base font-normal leading-[22.4px] sm:order-3 md:flex-row">
        <button className="flex h-12 w-full items-center justify-center rounded-md border border-[#000928]  sm:w-[180px]">
          編輯個人檔案
        </button>
      </div>
      <ul className="mt-6 flex w-full items-center justify-center gap-6 sm:mt-4 sm:justify-start">
        {userStatusList.map(({ key, value }) => (
          <li
            key={key}
            className="relative flex h-[38px] w-[84px] flex-col items-center justify-between after:absolute after:-right-3 after:top-[9px] after:h-5 after:w-[0.5px] after:bg-primary-200  last:after:hidden  sm:w-fit sm:flex-row sm:gap-1 sm:after:hidden"
          >
            <p className="text-base font-bold leading-5 text-primary-700">
              {value}
            </p>
            <p className=" text-sm font-normal leading-[14px]  text-primary-500 sm:text-base sm:leading-6">
              {key}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MemberUserIntro
