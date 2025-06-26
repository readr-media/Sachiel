export default function Loading() {
  return (
    <div className="flex grow flex-col">
      <div className="flex animate-pulse items-center gap-4 p-5 pb-6 sm:gap-6 sm:pb-4 sm:pt-2 md:px-[70px] lg:px-10">
        <div className="size-16 rounded-lg bg-loading sm:size-20" />
        <div className="h-8 w-[120px] rounded-sm bg-loading sm:w-[200px]" />
      </div>
      <div className="flex flex-col gap-2 px-5 sm:hidden">
        <div className="button-large flex items-center justify-center rounded-md border border-primary-800 py-3 sm:hidden">
          編輯個人檔案
        </div>
        <div className="button-large flex items-center justify-center rounded-md bg-custom-blue py-3 text-white">
          贊助媒體
        </div>
      </div>
      <div className="flex animate-pulse items-center justify-center sm:justify-start">
        <div className="mb-8 mt-6 flex items-center gap-3 sm:m-0 sm:mb-6 sm:gap-5 sm:px-5 md:px-[70px] lg:px-10">
          <div className="flex w-[84px] flex-col items-center gap-1 sm:w-auto sm:flex-row">
            <div className="h-5 w-10 rounded-sm bg-loading" />
            <div className="profile-subtitle text-primary-500">粉絲</div>
          </div>
          <div className="h-5 w-[0.5px] bg-primary-200 sm:hidden" />
          <div className="flex w-[84px] flex-col items-center gap-1 sm:w-auto sm:flex-row">
            <div className="h-5 w-10 rounded-sm bg-loading" />
            <div className="profile-subtitle text-primary-500">
              本月獲得贊助
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4 hidden gap-2 sm:flex sm:px-5 md:px-[70px] lg:px-10">
        <div className="button-large flex w-[180px] items-center justify-center rounded-md border border-primary-800 py-3">
          追蹤
        </div>
        <div className="button-large flex w-[180px] items-center justify-center rounded-md bg-custom-blue py-3 text-white">
          贊助媒體
        </div>
      </div>
      <div className="flex animate-pulse border-y border-[rgba(0,9,40,0.1)] sm:gap-2 sm:border-t-0 sm:px-5 md:px-[70px] lg:px-10">
        <div className="flex flex-1 justify-center sm:flex-none">
          <div className="button-large flex h-12 w-15 items-center justify-center border-b border-[rgba(0,9,40,0.87)] text-primary-700 sm:w-24">
            報導
          </div>
        </div>
      </div>
      <div className="animate-pulse px-5 sm:p-5 md:hidden">
        {Array.from(Array(3)).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-5 sm:gap-10">
            <div className="flex w-full flex-col gap-3">
              <div className="h-3 w-full rounded-sm bg-loading sm:h-5" />
              <div className="h-3 w-[120px] rounded-sm bg-loading sm:h-5 sm:w-[200px]" />
            </div>
            <div className="h-12 w-24 shrink-0 bg-loading sm:h-[80px] sm:w-[160px]" />
          </div>
        ))}
      </div>
      <div className="animate-pulse bg-multi-layer-light">
        <div className="hidden max-w-[theme(width.maxMain)] grow gap-5 p-10 md:grid md:grid-cols-2 lg:grid-cols-3">
          {Array.from(Array(3)).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-md drop-shadow md:first-of-type:hidden lg:first-of-type:block"
            >
              <div className="aspect-[2/1] bg-loading"></div>
              <div className="bg-white pb-5 pt-3">
                <div className="flex flex-col gap-3 px-5 py-3">
                  <div className="h-5 w-full rounded-sm bg-loading" />
                  <div className="h-5 w-[200px] rounded-sm bg-loading" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
