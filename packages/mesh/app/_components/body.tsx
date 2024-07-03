'use client'

import { usePathname } from 'next/navigation'

import { BG_WHITE_PAGE_PATHS } from '@/constants/page-style'

export default function Body({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isBgWhite = !!BG_WHITE_PAGE_PATHS.find((path) =>
    pathname.startsWith(path)
  )

  return (
    <body className={`min-h-screen ${isBgWhite ? 'bg-white' : 'bg-gray-50'}`}>
      {children}
    </body>
  )
}
