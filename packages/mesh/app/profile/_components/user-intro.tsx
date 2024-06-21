import Image from 'next/image'

type UserIntroProps = {
  id: string
  name: string
  avatar: string
  intro: string
  pickCount: number
  followingCount: number
  followerCount: number
}
const UserIntro = ({
  avatar,
  name,
  pickCount,
  intro,
  followingCount,
  followerCount,
}: UserIntroProps) => {
  return (
    <div className="flex flex-col items-center px-5 pt-6 pb-8">
      <section className="flex w-full gap-4">
        <div className="flex h-[64px] w-[64px] overflow-hidden rounded-full">
          <Image
            alt={`${name}'s avatar`}
            src={avatar}
            width={64}
            height={64}
            className=" object-cover"
          />
        </div>
        <div className="flex flex-col">
          <p className=" text-lg font-bold leading-6 text-primary-700">
            {name}
          </p>
          <p className=" text-[13px] font-normal leading-[19.5px] text-primary-500">
            本週精選了<span className="text-primary-800"> {pickCount} </span>
            篇文章
          </p>
        </div>
      </section>
      <p className="mt-6 text-[14px] font-normal leading-[21px] text-primary-500">
        {intro}
      </p>
      <button className="mt-6 flex h-12 w-full items-center justify-center rounded-md border border-[#000928]">
        編輯個人檔案
      </button>
      <ul className="mt-6 flex items-center gap-6">
        <li className="flex h-[38px] flex-col items-center justify-between">
          <p className="text-base font-bold leading-5 text-primary-700">
            {pickCount}
          </p>
          <p className=" text-sm font-normal leading-[14px] text-primary-500">
            精選
          </p>
        </li>
        <div className="h-5 w-[0.25px] bg-primary-200" />
        <li className="flex h-[38px] flex-col items-center justify-between">
          <p className="text-base font-bold leading-5 text-primary-700">
            {followerCount}
          </p>
          <p className=" text-sm font-normal leading-[14px] text-primary-500">
            粉絲
          </p>
        </li>
        <div className="h-5 w-[0.25px] bg-primary-200" />
        <li className="flex h-[38px] flex-col items-center justify-between">
          <p className="text-base font-bold leading-5 text-primary-700 ">
            {followingCount}
          </p>
          <p className=" text-sm font-normal leading-[14px] text-primary-500">
            追蹤中
          </p>
        </li>
      </ul>
    </div>
  )
}

export default UserIntro
