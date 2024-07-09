import { TabCategory } from '@/types/tab'

type TabItem = {
  name: string
  category: TabCategory
}

const Tab = () => {
  const tabList: TabItem[] = [
    {
      name: '報導',
      category: TabCategory.PUBLISH,
    },
  ]
  return (
    <ul
      className="flex h-[48px] w-full items-center justify-around  border-b border-t border-[rgba(0,9,40,0.1)]
sm:justify-start sm:gap-2 sm:pl-5 md:pl-[70px]"
    >
      {tabList.map(({ name }) => (
        <li
          key={name}
          className="text-primary-700' relative cursor-pointer p-[14px] pt-3 font-normal leading-[22.4px] after:absolute after:bottom-[-1px] after:left-0 after:w-full after:border after:border-primary-800 sm:px-8 sm:py-[13px]"
        >
          {name}
        </li>
      ))}
    </ul>
  )
}

export default Tab
