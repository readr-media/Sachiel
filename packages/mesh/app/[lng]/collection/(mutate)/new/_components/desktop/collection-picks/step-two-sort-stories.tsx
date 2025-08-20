import SortStories from '@/app/[lng]/collection/(mutate)/_components/sort-stories'
import { useCreateCollection } from '@/context/create-collection'

export default function DesktopStep2SortStories() {
  return <SortStories useCollection={useCreateCollection} />
}
