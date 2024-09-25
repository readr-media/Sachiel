import { displayDateWithWeekday } from '@/utils/story-display'

export default function Loading() {
  return (
    <main className="max-w-[theme.width.maxMain] px-5 pt-4 sm:pt-5 lg:px-10">
      <div className="flex justify-between">
        <h2 className="list-title lg:title-1 text-primary-700">今日焦點</h2>
        <time className="button text-primary-500">
          {displayDateWithWeekday()}
        </time>
      </div>
      <div className="mt-3 flex animate-pulse flex-col gap-3 sm:mt-4 lg:flex-row lg:items-center lg:gap-10">
        <div className="aspect-[2/1] rounded-md bg-loading lg:flex-1" />
        <div className="flex shrink-0 flex-col gap-3 sm:px-5 lg:flex-1 lg:px-0">
          <div className="mb-3 hidden h-5 w-20 rounded-sm bg-loading lg:block" />
          <div className="h-8 w-full rounded-sm bg-loading" />
          <div className="h-8 w-[240px] rounded-sm bg-loading" />
        </div>
      </div>
      <div className="mt-4 flex animate-pulse gap-2 overflow-scroll sm:mt-5">
        {Array.from(Array(3)).map((_, i) => (
          <div
            key={i}
            className="flex w-[280px] shrink-0 flex-col gap-2 rounded-md border-[0.5px] border-primary-200 bg-primary-100 px-4 py-[23px] lg:w-full lg:flex-1"
          >
            <div className="h-3 w-10 rounded-sm bg-loading" />
            <div className="h-5 w-full rounded-sm bg-loading" />
            <div className="h-5 w-[120px] rounded-sm bg-loading" />
          </div>
        ))}
      </div>
      <div className="mt-6 animate-pulse sm:mt-5 lg:grid lg:grid-cols-2 lg:gap-x-10">
        {Array.from(Array(6)).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 py-5 first-of-type:pt-0 sm:gap-10 sm:first-of-type:pt-5"
          >
            <div className="flex w-full flex-col gap-3">
              <div className="h-3 w-full rounded-sm bg-loading" />
              <div className="h-3 w-[120px] rounded-sm bg-loading sm:w-[200px]" />
            </div>
            <div className="h-12 w-24 shrink-0 rounded bg-loading sm:h-20 sm:w-[160px]" />
          </div>
        ))}
      </div>
    </main>
  )
}
