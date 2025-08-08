import EditHeroImage from '@/app/[lng]/collection/(mutate)/_components/edit-hero-image'
import EditSummary from '@/app/[lng]/collection/(mutate)/_components/edit-summary'
import EditTitle from '@/app/[lng]/collection/(mutate)/_components/edit-title'
import { useCreateCollection } from '@/context/create-collection'

import DesktopGoNextButton from '../go-next-button'
import DesktopNavigation from '../navigtaion'

export default function DesktopStep1FullEdit() {
  return (
    <>
      <DesktopNavigation />
      <div className="flex h-full flex-col gap-6 px-5">
        <EditHeroImage useCollection={useCreateCollection} />
        <EditTitle useCollection={useCreateCollection} />
        <EditSummary useCollection={useCreateCollection} />
      </div>
      <div className="px-5 py-3">
        <DesktopGoNextButton />
      </div>
    </>
  )
}
