import Image from 'next/image'

import type { Story } from '@/graphql/query/stories'

// only used in desktop width
export default function HeroStoryCard({ story }: { story: Story }) {
  return (
    <article className="col-span-2 border-b pb-4 pt-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-5 lg:gap-10">
        {/* use padding-top to set aspect-ratio to prevent height growing when right block grows in too many lines of titles */}
        <div className="relative h-0 w-[calc((100%-40px)/2)] flex-1 pt-[calc((100%-40px)/4)]">
          <Image
            className="rounded-md object-cover"
            src={story.og_image || '/images/default-story-image.webP'}
            alt={story.title}
            fill
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          {/* right top section */}
          <div>
            <div className="flex h-6 flex-row items-center justify-between">
              <h4 className="body-3 h-5 text-primary-500 lg:h-auto">
                {story.source?.title}
              </h4>
              <button>...</button>
            </div>
            <div className="hero-title mt-1 text-primary-700">
              {story.title}
            </div>
            <div className="body-3 mt-3 line-clamp-1 text-primary-600">
              {story.summary}
            </div>
            <div className="footnote mt-3 flex flex-row justify-between text-primary-500">
              comment 數量。發布時間
            </div>
          </div>
          {/* right bottom section */}
          <div>
            <div className="mt-4 flex h-8 flex-row justify-between">
              <div>OOO</div>
              {/* 改成共用元件 */}
              <button>精選</button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
