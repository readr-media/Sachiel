import DesktopCollectionPicks from './collection-picks'
import DesktopMainAction from './main-action'

export default function DesktopEditCollection() {
  return (
    <div className="hidden grow flex-col lg:flex">
      <DesktopMainAction />
      <DesktopCollectionPicks />
    </div>
  )
}
