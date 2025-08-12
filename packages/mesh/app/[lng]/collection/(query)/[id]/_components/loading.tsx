import React from 'react'

export default function Loading() {
  return (
    <div className="grow bg-white">
      <div className="flex max-w-[theme(width.maxMain)] flex-col border-b sm:items-center lg:grid  lg:grid-cols-[600px_1fr] lg:px-10 lg:pb-5 lg:pt-2">
        <div className="aspect-[2/1] w-full animate-pulse bg-loading sm:max-w-[600px] sm:rounded-md lg:order-2 lg:max-w-[unset]" />
        <div className="mb-5 mt-3 flex w-full flex-col gap-3 px-5 sm:max-w-[600px] lg:order-1 lg:my-0 lg:max-w-[unset] lg:justify-center">
          <div className="mb-3 hidden h-5 w-20 animate-pulse rounded-sm bg-loading lg:block" />
          <div className="h-8 w-full animate-pulse rounded-sm bg-loading" />
          <div className="h-8 w-[240px] animate-pulse rounded-sm bg-loading" />
        </div>
      </div>
      <div className="bg-white md:bg-multi-layer-light">
        <div className="max-w-[theme(width.maxMain)] md:grid md:grid-cols-2 md:gap-5 md:p-10 lg:grid-cols-3">
          {Array.from(Array(3)).map((_, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center gap-3 p-5 md:hidden">
                <div className="flex w-full flex-col gap-3">
                  <div className="h-3 w-full animate-pulse rounded-sm bg-loading sm:h-5" />
                  <div className="h-3 w-1/2 animate-pulse rounded-sm bg-loading sm:h-5" />
                </div>
                <div className="aspect-[2/1] w-24 shrink-0 animate-pulse rounded bg-loading sm:w-[160px]" />
              </div>
              <div
                className={`hidden flex-col rounded-md bg-white shadow-card md:flex ${
                  i === 2 ? 'md:hidden lg:invisible' : ''
                }`}
              >
                <div className="aspect-[2/1] animate-pulse bg-loading" />
                <div className="flex flex-col gap-5 px-5 pb-5 pt-3">
                  <div className="h-5 w-full animate-pulse rounded-sm bg-loading" />
                  <div className="h-5 w-[240px] animate-pulse rounded-sm bg-loading" />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
