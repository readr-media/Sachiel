import Icon from '@/components/icon'

export default function DeletionResultHeader() {
  return (
    <>
      <header className="flex w-full justify-center border-b-[0.5px] border-b-primary-800 border-opacity-10 py-3 sm:hidden">
        <Icon
          size={{ width: 144, height: 36 }}
          iconName="icon-readr-logoA-mobile"
        />
      </header>
      <header className="hidden w-full justify-center border-b-[0.5px] border-b-primary-800 border-opacity-10 py-3 sm:flex">
        <Icon
          size={{ width: 176, height: 44 }}
          iconName="icon-readr-logoA-desktop"
        />
      </header>
    </>
  )
}
