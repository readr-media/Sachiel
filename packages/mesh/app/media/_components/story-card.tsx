import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

import { imageSizes } from '@/constants/media'
import type { Story } from '@/graphql/query/stories'

export default function StoryCard({
  story,
  isMobile,
  className = '',
}: {
  story: Story
  isMobile: boolean
  className?: string
}) {
  const imageSize = isMobile ? imageSizes.mobile : imageSizes.nonMobile
  const titleClass = isMobile ? 'subtitle-1' : 'title-2'

  const metaJsx = (
    <div className="caption-1 mt-2 flex text-primary-500 sm:mt-1">
      comment 數量。發布時間
    </div>
  )

  return (
    <article
      className={twMerge(
        'flex flex-col justify-between border-b pb-4 pt-5',
        className
      )}
    >
      <div>
        <div className="flex h-6 flex-row items-center justify-between">
          <h4 className="caption-1 line-clamp-1 text-primary-500">
            {story.source?.title}
          </h4>
          <button>...</button>
        </div>
        <div className="mt-1 flex flex-row justify-between gap-3 sm:gap-10">
          <div>
            <h2 className={`${titleClass} text-primary-700`}>{story.title}</h2>
            {!isMobile && metaJsx}
          </div>
          {story.og_image && (
            <Image
              style={{
                width: imageSize.width,
                height: imageSize.height,
              }}
              className={`flex-shrink-0 rounded-[4px]`}
              src={story.og_image}
              alt={story.title}
              width={imageSize.width}
              height={imageSize.height}
            />
          )}
        </div>
        {isMobile && metaJsx}
      </div>
      <div className="mt-4 flex h-8 flex-row justify-between">
        <div>OOO</div>
        {/* 改成共用元件 */}
        <button>精選</button>
      </div>
    </article>
  )
}
