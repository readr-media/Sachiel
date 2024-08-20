import LayoutTemplate from '@/components/layout-template'

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LayoutTemplate type="default">{children}</LayoutTemplate>
}
