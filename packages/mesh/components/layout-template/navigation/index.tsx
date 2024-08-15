import NavigationButton, {
  type NavigationButtonProps,
} from './navigation-button'

export default function MobileDefaultNavigation({
  leftButtons,
  title,
  rightButtons,
}: {
  leftButtons: NavigationButtonProps[]
  title: string
  rightButtons: NavigationButtonProps[]
}) {
  return (
    <header className="fixed inset-x-0 top-0 z-layout flex h-[60px] border-b bg-white sm:hidden">
      <div className="flex h-full grow items-center justify-between px-2 sm:px-0">
        <div className="flex">
          {leftButtons.map((button, i) => (
            <NavigationButton key={i} {...button} />
          ))}
        </div>
        <h2 className="list-title text-primary-800">{title}</h2>
        <div className="flex">
          {rightButtons.map((button, i) => (
            <NavigationButton key={i} {...button} />
          ))}
        </div>
      </div>
    </header>
  )
}
