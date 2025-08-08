import EditHeroImage from '@/app/[lng]/collection/(mutate)/_components/edit-hero-image'
import EditTitle from '@/app/[lng]/collection/(mutate)/_components/edit-title'
import { useEditCollection } from '@/context/edit-collection'

import TabletGoNextButton from '../../tablet/go-next-button'

export default function MobileEditTitle() {
  return (
    <div className="flex flex-col gap-8">
      <EditHeroImage useCollection={useEditCollection} />
      <EditTitle autoFocus={true} useCollection={useEditCollection} />
      <div className="hidden items-center justify-center pt-6 sm:flex">
        <div className="w-[295px]">
          <TabletGoNextButton />
        </div>
      </div>
    </div>
  )
}
