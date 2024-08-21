import Icon from '@/components/icon'

export default function StatelessHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-layout hidden h-[60px] border-b bg-white sm:block">
      <div className="flex size-full items-center justify-center">
        <Icon
          size={{ width: 176, height: 44 }}
          iconName="icon-readr-logoA-desktop"
        />
      </div>
    </header>
  )
}
