const Tab = () => {
  return (
    <ul
      className="flex w-full items-center justify-around border-b border-t
border-[rgba(0,9,40,0.1)]"
    >
      <li className=" relative p-[14px] pt-3 font-normal leading-[22.4px] text-primary-400 after:absolute after:bottom-[-1px] after:left-0 after:w-full after:border after:border-primary-800">
        精選
      </li>
      <li className="p-[14px] pt-3 font-normal leading-[22.4px] text-primary-400">
        書籤
      </li>
    </ul>
  )
}

export default Tab
