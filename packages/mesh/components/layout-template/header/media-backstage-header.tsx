import Link from 'next/link'

import Icon from '@/components/icon'
import { LOGO_ICONS } from '@/constants/layout'

export default function MediaBackstageHeader() {
  return (
    <header className="flex h-[theme(height.header.sm)] border-b bg-white px-10 py-3 xl:pl-[calc(((100vw-theme(width.maxContent))/2)+40px)]">
      <Link
        href={LOGO_ICONS.mobile.href}
        className="flex items-center justify-center"
      >
        <Icon
          size={LOGO_ICONS.nonMobile.size}
          iconName={LOGO_ICONS.nonMobile.icon}
        />
      </Link>
    </header>
  )
}
