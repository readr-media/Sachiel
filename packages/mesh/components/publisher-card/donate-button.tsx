'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { getPublisherWallet } from '@/app/actions/publisher'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import useRedirectLogin from '@/hooks/use-redirect-login'
import { PaymentType } from '@/types/payment'

import Button from '../button'

export default function PublisherDonateButton({
  publisherId,
  gtmClassName = '',
}: {
  publisherId: string
  gtmClassName?: string
}) {
  const { t } = useCustomTranslation()
  const router = useRouter()
  const [isWalletAvailable, setIsWalletAvailable] = useState(false)
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()

  useEffect(() => {
    const init = async () => {
      const publisher = await getPublisherWallet(publisherId)
      setIsWalletAvailable(!!publisher?.admin?.wallet)
    }

    init()
  }, [publisherId])

  const handleClickDonate = () => {
    if (detectIfShouldRedirectToLogin()) {
      return
    }
    router.push(`/payment/${PaymentType.Sponsor}/${publisherId}`)
  }

  return (
    <Button
      size="sm"
      color="custom-blue"
      icon={{ iconName: 'icon-donate', size: 's' }}
      text={t('Components.PublisherDonateButton.donate', '贊助')}
      onClick={handleClickDonate}
      disabled={!isWalletAvailable}
      gtmClassName={gtmClassName}
    />
  )
}
