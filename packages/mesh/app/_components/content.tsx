'use client'

import { usePathname } from 'next/navigation'

import { BG_WHITE_PAGE_PATHS } from '@/constants/page-style'

export default function Content({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isBgWhite = !!BG_WHITE_PAGE_PATHS.find((path) =>
    pathname.startsWith(path)
  )

  return (
    <div className={`flex grow ${isBgWhite ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="flex grow flex-col xl:max-w-[theme(width.maxMain)]">
        {children}
      </div>
    </div>
  )
}
