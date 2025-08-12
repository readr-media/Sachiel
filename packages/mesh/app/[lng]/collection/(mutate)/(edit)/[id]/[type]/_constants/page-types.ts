import {
  DesktopEditCollectionType,
  MobileEditCollectionType,
} from '../../../_types/edit-collection'

export const pageTypes: Record<
  string,
  DesktopEditCollectionType | MobileEditCollectionType
> = {
  edit: DesktopEditCollectionType.EditAll,
  'edit-stories': MobileEditCollectionType.EditStories,
  'edit-summary': MobileEditCollectionType.EditSummary,
  'edit-title': MobileEditCollectionType.EditTitle,
}
