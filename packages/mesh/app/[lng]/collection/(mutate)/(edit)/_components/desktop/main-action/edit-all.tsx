import EditHeroImage from '@/app/[lng]/collection/(mutate)/_components/edit-hero-image'
import EditSummary from '@/app/[lng]/collection/(mutate)/_components/edit-summary'
import EditTitle from '@/app/[lng]/collection/(mutate)/_components/edit-title'
import { useEditCollection } from '@/context/edit-collection'

import DesktopGoNextButton from '../go-next-button'
import DesktopNavigation from '../navigtaion'

export default function DesktopEditAll() {
  return (
    <>
      <DesktopNavigation />
      <div className="flex h-full flex-col gap-6 px-5">
        <EditHeroImage useCollection={useEditCollection} />
        <EditTitle useCollection={useEditCollection} autoFocus={false} />
        <EditSummary useCollection={useEditCollection} autoFocus={false} />
      </div>
      <div className="px-5 py-3">
        <DesktopGoNextButton />
      </div>
    </>
  )
}
