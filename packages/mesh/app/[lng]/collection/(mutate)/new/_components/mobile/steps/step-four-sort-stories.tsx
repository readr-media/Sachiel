import SortStories from '@/app/[lng]/collection/(mutate)/_components/sort-stories'
import { useCreateCollection } from '@/context/create-collection'

import TabletGoNextButton from '../../tablet/go-next-button'

export default function MobileStep4SortStories() {
  return (
    <div className="flex grow flex-col pl-2 pr-5 sm:px-5 md:px-[70px] lg:pl-10 lg:pr-0">
      <SortStories useCollection={useCreateCollection} />
      <div className="fixed inset-x-0 bottom-0 hidden items-center justify-center bg-white py-4 sm:flex lg:hidden">
        <div className="w-[335px]">
          <TabletGoNextButton />
        </div>
      </div>
    </div>
  )
}
