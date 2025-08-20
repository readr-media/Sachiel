export default function Loading() {
  return (
    <div className="flex grow flex-col lg:p-10">
      <div className="grow bg-white lg:hidden">
        <div className="animate-pulse px-5 sm:px-10 lg:grid lg:grid-cols-2 lg:gap-x-15">
          {Array.from(Array(3)).map((_, i) => (
            <div key={i} className="py-5 sm:last-of-type:border-b-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex w-full items-center justify-between gap-3 sm:gap-10">
                  <div className="flex w-full flex-col gap-1">
                    <div className="h-3 w-full rounded-sm bg-loading" />
                    <div className="h-3 w-1/2 rounded-sm bg-loading" />
                  </div>
                  <div className="aspect-[2/1] w-24 shrink-0 rounded-lg bg-loading sm:w-[160px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden animate-pulse lg:grid lg:grid-cols-3 lg:gap-5">
        {Array.from(Array(3)).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-md shadow-card"
          >
            <div className="aspect-[2/1] w-full bg-loading" />
            <div className="flex flex-col gap-3 bg-white px-5 pb-8 pt-6">
              <div className="h-5 w-full rounded-sm bg-loading" />
              <div className="h-5 w-[200px] rounded-sm bg-loading" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
