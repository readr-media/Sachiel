import PickStories from '@/app/[lng]/collection/(mutate)/_components/pick-stories'
import PickStoryCard from '@/app/[lng]/collection/(mutate)/_components/pick-story-card'
import type { CollectionPickStory } from '@/app/[lng]/collection/(mutate)/_types/collection'
import { useCreateCollection } from '@/context/create-collection'

export default function DesktopStep1FullEdit({
  fixedStory,
}: {
  fixedStory: CollectionPickStory | null
}) {
  return !fixedStory ? (
    <Step1PickStories />
  ) : (
    <Step1FixedStory fixedStory={fixedStory} />
  )
}

const Step1PickStories = () => {
  return <PickStories useCollection={useCreateCollection} />
}

const Step1FixedStory = ({
  fixedStory,
}: {
  fixedStory: CollectionPickStory | null
}) => {
  if (!fixedStory) return null
  return (
    <PickStoryCard
      key={fixedStory.id}
      isPicked={true}
      onClick={() => {}}
      story={fixedStory}
    />
  )
}
