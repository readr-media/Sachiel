import LayoutTemplate from '@/components/layout-template'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutTemplate type="default">{children}</LayoutTemplate>
}
