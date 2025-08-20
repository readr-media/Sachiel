export default function Loading({
  withCategory = true,
}: {
  withCategory?: boolean
}) {
  return (
    <>
      {withCategory && (
        <div className="animate-pulse px-5 py-4 sm:py-5 lg:pl-10">
          <div className="h-9 w-15 rounded-[100px] bg-loading" />
        </div>
      )}
      <div className="animate-pulse lg:hidden">
        {Array.from(Array(5)).map((_, i) => (
          <div
            key={i}
            className="flex gap-3 p-5 sm:gap-10 sm:first-of-type:pt-0"
          >
            <div className="flex w-full flex-col justify-center gap-3">
              <div className="h-5 w-full rounded-sm bg-loading" />
              <div className="h-5 w-1/2 rounded-sm bg-loading" />
            </div>
            <div className="h-12 w-24 rounded-sm bg-loading sm:h-20 sm:w-40" />
          </div>
        ))}
      </div>
      <div className="m-10 mt-0 hidden animate-pulse lg:block">
        <div className="grid grid-cols-2 justify-between gap-10 border-b border-[rgba(0,9,40,0.1)] pb-5 pt-3">
          <div className="aspect-[2/1] bg-loading " />
          <div className="flex w-full flex-col justify-center">
            <div className="mb-5 h-5 w-20 rounded-sm bg-loading" />
            <div className="mb-3 h-8 w-full rounded-sm bg-loading" />
            <div className="h-8 w-1/2 rounded-sm bg-loading" />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-10 lg:grid lg:grid-cols-2">
          {Array.from(Array(4)).map((_, i) => (
            <div key={i} className="flex gap-10 py-5">
              <div className="flex flex-1 flex-col justify-center gap-3">
                <div className="h-5 w-full rounded-sm bg-loading" />
                <div className="h-5 w-[200px] rounded-sm bg-loading" />
              </div>
              <div className="h-20 w-40 shrink-0 rounded-sm bg-loading" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
