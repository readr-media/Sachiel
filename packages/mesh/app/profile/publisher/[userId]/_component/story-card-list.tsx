'use client'

import { type GetPublisherProfileQuery } from '@/graphql/__generated__/graphql'

import ArticleCard from './article-card'
type StoryCardListProps = {
  storyData: GetPublisherProfileQuery['stories']
  id: string
  avatar?: string
  userType?: string
}
const StoryCardList = ({ storyData, id, userType }: StoryCardListProps) => {
  if (!storyData) return <></>
  return (
    <>
      <ul className="max-w-[1120px] bg-primary-700-dark md:grid md:grid-cols-2 md:items-center md:gap-5 md:p-10 lg:grid-cols-3">
        {storyData.map((story, idx) => {
          if (!story) return <></>
          return (
            <li
              key={story?.id}
              className="relative h-full w-full bg-white md:rounded-md md:shadow-[0_2px_2px_0px_rgba(0,9,40,0.1)]"
            >
              <ArticleCard
                data={story}
                isLast={idx === storyData.length - 1}
                id={id}
                userType={userType}
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default StoryCardList
