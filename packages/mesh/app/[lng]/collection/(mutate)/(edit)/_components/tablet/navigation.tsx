import MobileGoBackButton from '../mobile/go-back-button'
import MobileTitle from '../mobile/title'

export default function TabletNavigation() {
  return (
    <div className="hidden items-center gap-5 px-5 py-4 sm:flex md:px-[70px] lg:hidden">
      <MobileGoBackButton />
      <h2 className="list-title text-primary-800">
        <MobileTitle />
      </h2>
    </div>
  )
}
