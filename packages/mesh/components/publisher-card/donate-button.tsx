'use client'

import Button from '../button'

export default function PublisherDonateButton() {
  const handleClickDonate = () => {
    // TODO: handle donate publisher
  }

  return (
    <Button
      size="sm"
      color="custom-blue"
      icon={{ iconName: 'icon-donate', size: 's' }}
      text="贊助"
      onClick={handleClickDonate}
    />
  )
}
