import Loading from '@/app/[lng]/_components/loading'
import LayoutTemplate from '@/components/layout-template'

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="default"
      suspenseFallback={<Loading />}
      customStyle={{ background: 'bg-white' }}
    >
      {children}
    </LayoutTemplate>
  )
}
