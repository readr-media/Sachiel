import LayoutTemplate from '@/components/layout-template'
import GoBackButton from '@/components/navigation/go-back-button'

export default function PublisherListLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      customStyle={{
        background: 'sm:bg-multi-layer-light',
      }}
      nonMobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: '媒體列表',
        rightButtons: [],
      }}
      mobileNavigation={{
        leftButtons: [<GoBackButton key={0} />],
        title: '媒體列表',
        rightButtons: [],
      }}
      type="default"
    >
      {children}
    </LayoutTemplate>
  )
}
