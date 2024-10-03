'use client'

import { twMerge } from 'tailwind-merge'

import Icon from '../icon'

export default function MoreButton({ className = '' }: { className?: string }) {
  const handleClickMore = () => {
    // TODO: handle more action
  }

  return (
    <button
      className={twMerge('size-11 sm:size-6', className)}
      onClick={handleClickMore}
    >
      <Icon iconName="icon-more-horiz" size="l" />
    </button>
  )
}
