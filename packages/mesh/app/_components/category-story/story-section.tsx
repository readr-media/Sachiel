import NextLink from 'next/link'

import InteractiveIcon from '@/components/interactive-icon'
import type { CategoryStory } from '@/types/homepage'

import StoryCard from '../story-card'
import Comment from './comment'
import EmptyMessage from './empty-message'
import MainCard from './main-card'

type Props = {
  stories: CategoryStory[] | null
  activeTitle: string
  slug: string
}
type NonEmptyObject<T> = T extends Record<string, never> ? never : T
type CommentType = NonEmptyObject<Exclude<CategoryStory['comment'], undefined>>

export default function StorySection({ activeTitle, stories, slug }: Props) {
  return (
    <div>
      <NextLink href={`/${slug}`} className="GTM-homepage_click_categorypage">
        <div className="group flex pb-3 pt-2 lg:pb-4">
          <h3 className="list-title lg:title-1 text-primary-700 group-hover:text-primary-500 group-active:text-primary-500">
            {activeTitle}
          </h3>
          <div className="flex items-center">
            <InteractiveIcon
              size={{ width: 24, height: 24 }}
              icon={{
                default: 'icon-navigate-next',
                hover: 'icon-navigate-next-hover',
              }}
            />
          </div>
        </div>
      </NextLink>

      {stories && stories.length > 0 ? (
        <div className="flex flex-col gap-y-5 lg:flex-row lg:gap-x-10">
          <div className="lg:max-w-[500px]">
            <MainCard story={stories[0]} />
            {stories[0].comment &&
              Object.keys(stories[0].comment).length !== 0 && (
                <Comment
                  comment={stories[0].comment as CommentType}
                  key={stories[0].id}
                />
              )}
          </div>

          <div className="flex flex-col gap-y-5">
            {stories.slice(1, 4).map((story) => (
              <StoryCard
                story={story}
                key={story.id}
                className="GTM-homepage_click_category_article"
                storyPickGtmClasssName="GTM-homepage_pick_category_article"
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyMessage />
      )}
    </div>
  )
}
