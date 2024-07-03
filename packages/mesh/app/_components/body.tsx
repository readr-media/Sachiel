'use client'

import { usePathname } from 'next/navigation'

import { BG_GRAY_PAGE_PATHS } from '@/constants/page-style'

export default function Body({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBgGray = !!BG_GRAY_PAGE_PATHS.find((path) =>
    pathname.startsWith(path)
  )

  return (
    <body className={`min-h-screen ${isBgGray ? 'bg-gray-50' : 'bg-white'}`}>
      {children}
    </body>
  )
}
