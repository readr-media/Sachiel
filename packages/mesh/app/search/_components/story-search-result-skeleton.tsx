export default function StorySearchResultSkeleton() {
  return (
    <>
      <h2 className="list-title pb-3 pt-4 sm:pb-4 sm:pt-5">所有新聞</h2>
      <div className="sm:max-w-[600px]">
        {Array.from(Array(6)).map((_, i) => (
          <div
            key={i}
            className={`flex animate-pulse flex-col border-b-[0.5px] last:border-b-0 ${
              i === 0 ? 'pb-5 pt-0' : 'py-5'
            }`}
          >
            {/* Publisher name skeleton */}
            <div className="flex flex-row items-center justify-between pb-1">
              <div className="h-3 w-20 rounded-sm bg-loading" />
              <div className="size-6 rounded bg-loading" />
            </div>

            {/* Story content skeleton */}
            <div className="flex flex-row justify-between gap-3 sm:gap-10">
              <div className="flex-1">
                {/* Title skeleton */}
                <div className="space-y-2">
                  <div className="h-5 w-full rounded-sm bg-loading" />
                  <div className="h-5 w-3/4 rounded-sm bg-loading" />
                </div>

                {/* Meta skeleton */}
                <div className="pt-2 sm:pt-1">
                  <div className="h-3 w-32 rounded-sm bg-loading" />
                </div>
              </div>

              {/* Image skeleton */}
              <div className="h-[48px] w-[96px] shrink-0 rounded bg-loading sm:h-[80px] sm:w-[160px]" />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
