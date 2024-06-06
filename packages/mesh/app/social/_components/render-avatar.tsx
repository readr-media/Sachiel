import Image from 'next/image'

import Icon from '@/components/icon'

export default function RenderAvatar({
  src,
  px,
}: {
  src: string
  px: 28 | 44
}) {
  const avatarVariants: { [key: number]: string } = {
    28: 'h-[28px] w-[28px]',
    44: 'h-11 w-11',
  }
  return src ? (
    <Image
      className={`inline-block ${avatarVariants[px]} rounded-full bg-white ring-2 ring-white`}
      src={src}
      width={px}
      height={px}
      alt={src}
    />
  ) : (
    <Icon iconName="icon-avatar-default" size={{ width: px, height: px }} />
  )
}
