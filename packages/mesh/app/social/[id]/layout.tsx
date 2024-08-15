import LayoutTemplate from '@/components/layout-template'

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="default"
      backgroundClass="bg-gray-50 sm:bg-multi-layer-light"
    >
      {children}
    </LayoutTemplate>
  )
}
