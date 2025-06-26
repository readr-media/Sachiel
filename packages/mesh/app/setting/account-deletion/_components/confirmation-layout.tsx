'use client'

import Footer from '@/components/layout-template/footer'
import Header, { HeaderType } from '@/components/layout-template/header'
import Nav, { NavType } from '@/components/layout-template/nav'
import MobileNavigation from '@/components/layout-template/navigation/mobile-navigation'
import NonMobileNavigation, {
  NonMobileNavigationType,
} from '@/components/layout-template/navigation/non-mobile-navigation'
import GoBackButton from '@/components/navigation/go-back-button'

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationData = {
    title: '刪除帳號',
    leftButtons: [<GoBackButton key={0} />],
    rightButtons: [],
  }

  return (
    <>
      <Header type={HeaderType.Default} />
      <div className="primary-container">
        <div className="flex grow flex-col">
          <div className="flex grow flex-col">
            <NonMobileNavigation
              type={NonMobileNavigationType.Default}
              {...navigationData}
            />
            {children}
          </div>
        </div>
        <Footer className="hidden sm:block" />
      </div>
      <Nav type={NavType.Default} />
      <MobileNavigation {...navigationData} />
    </>
  )
}
