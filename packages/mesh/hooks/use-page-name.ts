'use client'
import { usePathname } from 'next/navigation'

export default function usePageName() {
  const pathname = usePathname()
  if (pathname === '/') {
    return 'homepage'
  } else {
    return pathname.split('/')?.[1] ?? ''
  }
}
