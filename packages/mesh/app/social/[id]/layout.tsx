import LayoutTemplate from '@/components/layout-template'

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutTemplate type="default">{children}</LayoutTemplate>
}
