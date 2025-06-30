export default function CollectionSearchResultSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 border-t-[0.5px] border-primary-200 pt-4 sm:grid-cols-4 xl:grid-cols-5 [&>*]:w-full">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="animate-pulse">
          {/* Collection card skeleton */}
          <div className="flex w-full flex-col gap-2">
            {/* Image skeleton */}
            <div className="aspect-[4/3] w-full rounded-md bg-loading" />

            {/* Content skeleton */}
            <div className="flex flex-col gap-2 px-1">
              {/* Title skeleton */}
              <div className="h-4 w-full rounded-sm bg-loading" />
              <div className="h-4 w-3/4 rounded-sm bg-loading" />

              {/* Creator and reads count skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-3 w-16 rounded-sm bg-loading" />
                <div className="h-3 w-12 rounded-sm bg-loading" />
              </div>

              {/* Pick button skeleton */}
              <div className="mt-2 h-8 w-full rounded bg-loading" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
