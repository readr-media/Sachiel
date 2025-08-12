import { getT } from '@/app/i18n'
import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default async function SettingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t } = await getT('pages/contact')
  const navigationData = {
    title: t('Layout-title', '聯絡我們'),
    leftButtons: [<GoBackButton key={0} />],
    rightButtons: [],
  }

  return (
    <LayoutTemplate
      type="default"
      mobileNavigation={navigationData}
      nonMobileNavigation={navigationData}
      customStyle={{
        background: 'bg-multi-layer-light',
        footer: 'hidden sm:block',
      }}
    >
      {children}
    </LayoutTemplate>
  )
}
