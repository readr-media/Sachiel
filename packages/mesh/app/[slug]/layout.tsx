import LayoutTemplate from '@/components/layout-template'

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    //TODO: fixed 的 title
    <LayoutTemplate
      type="default"
      navigation={{ title: '熱門', leftButtons: [], rightButtons: [] }}
    >
      {children}
    </LayoutTemplate>
  )
}
