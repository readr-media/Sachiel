import Icon from '@/components/icon'
import { useEditCollection } from '@/context/edit-collection'

import {
  DesktopEditCollectionType,
  MobileEditCollectionType,
} from '../_types/edit-collection'

export default function AdditionalEditor() {
  const { setMobileEditType, setDesktopEditType } = useEditCollection()

  const turnOnAddStoryType = () => {
    setMobileEditType(MobileEditCollectionType.AddStories)
    setDesktopEditType(DesktopEditCollectionType.AddStories)
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-modal bg-red-50/20 xl:m-auto xl:w-[theme(width.maxContent)]">
      <div className="absolute bottom-0 right-0 flex pb-10 pr-4 sm:pb-28 sm:pr-[84px] lg:pb-12 lg:pr-15">
        <button
          className="pointer-events-auto flex rounded-[100px] bg-primary-700 py-[17px] pl-3 pr-4 text-white shadow-[0px_0px_8px_0px_rgba(0,9,40,0.1),0px_2px_16px_0px_rgba(0,9,40,0.3)]"
          onClick={turnOnAddStoryType}
        >
          <Icon iconName="icon-add-article" size="l" />
          新增文章
        </button>
      </div>
    </div>
  )
}
