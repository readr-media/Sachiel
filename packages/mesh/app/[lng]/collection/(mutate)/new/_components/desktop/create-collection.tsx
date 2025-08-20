import DesktopCollectionPicks from './collection-picks'
import DesktopMainAction from './main-action'

export default function DesktopCreateCollection() {
  return (
    <div className="hidden grow flex-col lg:flex">
      <DesktopMainAction />
      <DesktopCollectionPicks />
    </div>
  )
}
