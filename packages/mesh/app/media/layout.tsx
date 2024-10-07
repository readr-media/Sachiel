import LayoutTemplate from '@/components/layout-template'

import Loading from './_components/loading'

export default function MediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate type="default" suspenseFallback={<Loading />}>
      {children}
    </LayoutTemplate>
  )
}
