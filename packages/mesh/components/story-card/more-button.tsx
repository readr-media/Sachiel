'use client'

import Icon from '../icon'

export default function MoreButton() {
  const handleClickMore = () => {
    // TODO: handle more action
  }

  return (
    <button className="pl-2" onClick={handleClickMore}>
      <Icon iconName="icon-more-horiz" size="l" />
    </button>
  )
}
