import NavigationButton, {
  type NavigationButtonProps,
} from './navigation-button'

export type MobileNavigationProps = {
  leftButtons: NavigationButtonProps[]
  title: string
  rightButtons: NavigationButtonProps[]
}

/**
 * This component is used in some page to replace(cover) the mobile header.
 */
export default function MobileNavigation({
  leftButtons,
  title,
  rightButtons,
}: MobileNavigationProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-header flex h-[60px] border-b bg-white sm:hidden">
      <div className="relative flex h-full grow items-center justify-between px-2">
        <div className="flex">
          {leftButtons.map((button, i) => (
            <NavigationButton key={i} {...button} />
          ))}
        </div>
        <h2 className="list-title pointer-events-none absolute inset-0 flex items-center justify-center text-primary-800">
          {title}
        </h2>
        <div className="flex">
          {rightButtons.map((button, i) => (
            <NavigationButton key={i} {...button} />
          ))}
        </div>
      </div>
    </header>
  )
}
