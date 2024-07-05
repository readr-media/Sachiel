import Header from '@/app/_components/header'
import Icon from '@/components/icon'

export default function ProfileHeader() {
  return (
    <>
      <header className="absolute left-0 right-0 top-0 z-header h-[60px] border-b bg-white sm:hidden">
        <div className="flex h-full w-full items-center justify-center">
          <Icon
            size={{ width: 176, height: 44 }}
            iconName="icon-readr-logoA-desktop"
          />
        </div>
      </header>
      <div className="hidden sm:block">
        <Header />
      </div>
    </>
  )
}
