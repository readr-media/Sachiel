import Image from 'next/image'

import Icon from '@/components/icon'

export const renderAvatar = (avatar: string, px: 28 | 44) => {
  const avatarVariants: { [key: number]: string } = {
    28: 'h-[28px] w-[28px]',
    44: 'h-11 w-11',
  }
  return avatar ? (
    <Image
      className={`inline-block ${avatarVariants[px]} rounded-full bg-white ring-2 ring-white`}
      src={avatar}
      width={px}
      height={px}
      alt={avatar}
    />
  ) : (
    <Icon iconName="icon-avatar-default" size={{ width: px, height: px }} />
  )
}
