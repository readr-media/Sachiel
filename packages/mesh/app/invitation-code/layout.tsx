import { useTranslations } from 'next-intl'

import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import Spinner from '@/components/spinner'

export default function InvitationCodeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = useTranslations('Pages.Invitation-Code')
  const navigationData = {
    leftButtons: [<GoBackButton key={0} />],
    title: t('InvitationCodeLayout-title'),
    rightButtons: [],
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white sm:bg-multi-layer-light',
        restrictMainWidth: true,
        footer: 'hidden sm:block',
      }}
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
      suspenseFallback={<Spinner />}
    >
      {children}
    </LayoutTemplate>
  )
}
