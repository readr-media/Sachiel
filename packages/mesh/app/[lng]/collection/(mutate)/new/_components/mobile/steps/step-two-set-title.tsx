import EditHeroImage from '@/app/[lng]/collection/(mutate)/_components/edit-hero-image'
import EditTitle from '@/app/[lng]/collection/(mutate)/_components/edit-title'
import { useCreateCollection } from '@/context/create-collection'

import TabletGoNextButton from '../../tablet/go-next-button'

export default function MobileStep2SetTitle() {
  return (
    <div className="flex flex-col gap-8">
      <EditHeroImage useCollection={useCreateCollection} />
      <EditTitle autoFocus={true} useCollection={useCreateCollection} />
      <div className="hidden items-center justify-center pt-6 sm:flex">
        <div className="w-[295px]">
          <TabletGoNextButton />
        </div>
      </div>
    </div>
  )
}
