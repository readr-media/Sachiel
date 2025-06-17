import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'
import Spinner from '@/components/spinner'

export default function InvitationCodeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationData = {
    leftButtons: [<GoBackButton key={0} />],
    title: '邀請碼',
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
