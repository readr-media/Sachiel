'use client'
import { useRouter } from 'next/navigation'

import Icon from '@/components/icon'

const FollowListHeader = ({
  children,
  title,
}: Readonly<{
  children: React.ReactNode
  title: string
}>) => {
  const router = useRouter()
  const backToPreviousPage = () => {
    router.back()
  }
  return (
    <div className="flex grow flex-col bg-multi-layer-light">
      <header className="flex h-[60px] border-b bg-white px-2 sm:px-5 md:px-[70px] lg:px-10">
        <div className="grid w-maxMain grid-cols-3 items-center sm:flex sm:justify-start">
          <button
            type="button"
            className="p-3 pl-0"
            onClick={backToPreviousPage}
          >
            <Icon
              iconName="icon-chevron-left-hover"
              size={{ width: 20, height: 20 }}
            />
          </button>
          <p className="list-title place-self-center">{title}</p>
        </div>
      </header>
      {children}
    </div>
  )
}

export default FollowListHeader
