import SortStories from '@/app/[lng]/collection/(mutate)/_components/sort-stories'
import { useEditCollection } from '@/context/edit-collection'

import AdditionalEditor from '../../additional-editor'
import TabletGoNextButton from '../../tablet/go-next-button'

export default function MobileEditStories() {
  return (
    <>
      <div className="flex grow flex-col pl-2 pr-5 sm:px-5 md:px-[70px] lg:pl-10 lg:pr-0">
        <SortStories useCollection={useEditCollection} />
        <div className="fixed inset-x-0 bottom-0 hidden items-center justify-center bg-white py-4 sm:flex lg:hidden">
          <div className="w-[335px]">
            <TabletGoNextButton />
          </div>
        </div>
      </div>
      <AdditionalEditor />
    </>
  )
}
