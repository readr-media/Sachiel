export default function Loading() {
  return (
    <>
      <div className="flex grow animate-pulse flex-col bg-multi-layer-light">
        <div className="flex max-w-[theme(width.maxMain)] grow flex-col sm:m-5 sm:grow-0 sm:overflow-hidden sm:rounded-xl sm:shadow-card">
          <div className="grow bg-white sm:grow-0 lg:grid lg:grid-cols-2">
            {Array.from(Array(3)).map((_, i) => (
              <div key={i} className="group p-5 pb-0">
                <div className="flex items-center gap-2 border-b border-[rgba(0,0,0,0.1)] pb-5 group-last:border-0">
                  <div className="size-11 rounded-full bg-loading" />
                  <div className="flex flex-col gap-1">
                    <div className="h-3 w-[120px] rounded-sm bg-loading" />
                    <div className="h-3 w-[40px] rounded-sm bg-loading" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
