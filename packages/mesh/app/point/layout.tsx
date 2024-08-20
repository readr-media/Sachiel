import { usePathname } from 'next/navigation'

import LayoutTemplate from '@/components/layout-template'

export default function PointLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isNestedPage = pathname.split('/')[2] === 'sponsorship'

  if (isNestedPage) {
    return <>{children}</>
  }

  return (
    <LayoutTemplate
      type="default"
      customStyle={{
        background: 'bg-white sm:bg-multi-layer-light',
        restrictMainWidth: false,
        footer: 'hidden sm:block',
      }}
    >
      {children}
    </LayoutTemplate>
  )
}
