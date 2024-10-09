'use client'

import { useRouter } from 'next/navigation'

import { PaymentType } from '@/types/payment'

import Button from '../button'

export default function PublisherDonateButton({
  publisherId,
}: {
  publisherId: string
}) {
  const router = useRouter()
  const handleClickDonate = () => {
    router.push(`/payment/${PaymentType.Sponsor}/${publisherId}`)
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
