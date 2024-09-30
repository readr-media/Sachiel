import Icon from '../../../components/icon'

export default function Loading() {
  return (
    <div className="animate-pulse bg-white sm:rounded-md sm:drop-shadow">
      <div className="flex flex-col items-center gap-6 border-b border-[rgba(0,9,40,0.1)] py-10 sm:flex-row sm:items-end sm:justify-between sm:px-10">
        <div className="flex flex-col items-center gap-2 sm:flex-col-reverse sm:items-start">
          <div className="h-8 w-[120px] rounded-sm bg-loading" />
          <div className="flex items-center">
            <div className="profile-subtitle text-primary-500">讀選點數</div>
            <Icon
              iconName="icon-question-mark-circle"
              size="m"
              className="size-6"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex flex-col items-center gap-1 sm:flex-row">
            <div className="h-5 w-10 rounded-sm bg-loading" />
            <div className="profile-subtitle text-primary-500">已贊助次數</div>
          </div>
          <div className="h-5 w-px bg-primary-500 sm:hidden" />
          <div className="flex flex-col items-center gap-1 sm:flex-row">
            <div className="h-5 w-10 rounded-sm bg-loading" />
            <div className="profile-subtitle text-primary-500">訂閱中文章</div>
          </div>
        </div>
      </div>
      <div className="px-5 sm:px-10 sm:pb-10">
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
                <div className="h-3 w-10 rounded-sm bg-loading" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
