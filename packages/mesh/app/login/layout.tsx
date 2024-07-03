import Icon from '@/components/icon'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-dvh">
      <header className="absolute left-0 right-0 top-0 z-header hidden h-[60px] border-b bg-white sm:block">
        <div className="flex h-full w-full items-center justify-center">
          <Icon
            size={{ width: 176, height: 44 }}
            iconName="icon-readr-logoA-desktop"
          />
        </div>
      </header>
      <div className="flex h-full flex-col items-center bg-white sm:bg-gray-50 sm:pt-15">
        {children}
      </div>
    </div>
  )
}
