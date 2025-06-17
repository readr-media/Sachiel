import type { IconName } from '@/components/icon'

export type IconInfo = {
  icon: {
    default: IconName
    hover: IconName
    on: IconName
  }
  href: string
  text: string
}
