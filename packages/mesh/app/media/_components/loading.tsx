export default function Loading({
  withCategory = true,
}: {
  withCategory?: boolean
}) {
  return (
    <>
      {withCategory && (
        <div className="animate-pulse px-5 py-4 sm:py-5 xl:pl-10">
          <div className="h-9 w-15 rounded-[100px] bg-loading" />
        </div>
      )}
      <div className="animate-pulse xl:hidden">
        {Array.from(Array(5)).map((_, i) => (
          <div
            key={i}
            className="flex gap-3 p-5 sm:gap-10 sm:first-of-type:pt-0"
          >
            <div className="flex w-full flex-col justify-center gap-3">
              <div className="h-5 w-full bg-loading" />
              <div className="h-5 w-1/2 bg-loading" />
            </div>
            <div className="h-12 w-24 bg-loading sm:h-20 sm:w-40" />
          </div>
        ))}
      </div>
      <div className="m-10 mt-0 hidden animate-pulse xl:block">
        <div className="flex justify-between gap-10 border-b border-[rgba(0,9,40,0.1)] pb-5 pt-3">
          <div className="h-[250px] w-[500px] shrink-0 bg-loading " />
          <div className="flex w-full flex-col justify-center">
            <div className="mb-5 h-5 w-20 bg-loading" />
            <div className="mb-3 h-8 w-full bg-loading" />
            <div className="h-8 w-1/2 bg-loading" />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-10">
          {Array.from(Array(4)).map((_, i) => (
            <div key={i} className="flex w-[500px] gap-10 py-5">
              <div className="flex flex-col justify-center gap-3">
                <div className="h-5 w-articleNav bg-loading" />
                <div className="h-5 w-[200px] bg-loading" />
              </div>
              <div className="h-20 w-40 shrink-0 bg-loading" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
