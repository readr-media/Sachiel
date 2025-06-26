import Link from 'next/link'

import Button from '@/components/button'

import DeletionResultHeader from './result-header'

export default function Failure() {
  return (
    <>
      <DeletionResultHeader />
      <section className="flex w-full flex-col items-center justify-center sm:h-screen sm:bg-multi-layer-light">
        <div className="flex flex-col items-center gap-y-6 bg-single-layer px-5 pt-10 sm:w-[480px] sm:rounded-md sm:p-10 sm:shadow-[0_0_4px_0_rgba(0,9,40,0.1),0_2px_2px_0_rgba(0,9,40,0.1)]">
          <div className="flex flex-col items-center">
            <p className="title-2 mb-2 text-primary-700 sm:mb-1">
              喔不，出錯了...
            </p>
            <p className="body-2 text-center text-primary-500">
              刪除帳號失敗。請重新登入，或是聯繫客服信箱 readr@gmail.com
              由專人為您服務。
            </p>
          </div>
          <div className="w-full max-w-[295px] sm:max-w-[320px]">
            <Link href="/">
              <Button size="lg" color="transparent" text="回首頁" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
