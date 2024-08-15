// import Icon from '@/components/icon'
import LayoutTemplate from '@/components/layout-template'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutTemplate
      type="stateless"
      backgroundClass="bg-white sm:bg-multi-layer-light"
    >
      {children}
    </LayoutTemplate>
  )
}
