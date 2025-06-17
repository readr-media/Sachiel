export default function Loading() {
  return (
    <main className="flex grow justify-center gap-10 sm:p-5 lg:justify-start lg:px-10">
      <div className="flex w-full max-w-[600px] animate-pulse flex-col gap-4">
        {Array.from(Array(3)).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-md drop-shadow">
            <div className="bg-white px-5 py-3">
              <div className="h-3 rounded-sm bg-loading" />
            </div>
            <div className="aspect-[2/1] bg-loading" />
            <div className="flex flex-col gap-[10px] bg-white px-5 pb-4 pt-3">
              <div className="h-8 w-full rounded-sm bg-loading" />
              <div className="hidden h-8 w-[200px] rounded-sm bg-loading sm:block" />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden flex-col px-5 lg:flex">
        <h2 className="list-title text-primary-700">推薦追蹤</h2>
        <div className="mt-1 animate-pulse">
          {Array.from(Array(5)).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <div className="size-11 rounded-full bg-loading" />
              <div className="flex h-full w-[120px] flex-col gap-1">
                <div className="h-3 w-full rounded-sm bg-loading" />
                <div className="h-3 w-10 rounded-sm bg-loading" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
