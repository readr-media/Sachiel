import SortStories from '@/app/[lng]/collection/(mutate)/_components/sort-stories'
import { useEditCollection } from '@/context/edit-collection'

import AdditionalEditor from '../../additional-editor'

export default function DesktopSortStories() {
  return (
    <>
      <SortStories useCollection={useEditCollection} />
      <AdditionalEditor />
    </>
  )
}
