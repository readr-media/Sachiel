export default function Loading() {
  return (
    <div className="animate-pulse sm:p-5 md:px-[70px] md:py-10 lg:p-10">
      <div className="bg-white sm:rounded-md sm:drop-shadow">
        <div className="px-5 sm:px-10 lg:grid lg:grid-cols-2 lg:gap-x-15">
          {Array.from(Array(3)).map((_, i) => (
            <div
              key={i}
              className="border-b border-[rgba(0,9,40,0.1)] py-5 sm:last-of-type:border-b-0"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="size-11 rounded-lg bg-loading" />
                <div className="flex w-full items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="h-3 w-[120px] rounded-sm bg-loading" />
                    <div className="h-3 w-10 rounded-sm bg-loading" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
