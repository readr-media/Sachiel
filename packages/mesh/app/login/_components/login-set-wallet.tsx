import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/components/button'

export default function LoginSetWallet() {
  const router = useRouter()
  return (
    <div className="flex h-full flex-col items-center bg-white sm:bg-gray-50">
      <div className="flex h-15 w-full flex-row items-center justify-center border-b sm:hidden">
        <h2 className="list-title">連結錢包</h2>
      </div>
      <div className="flex w-full justify-center sm:h-full sm:items-center">
        <div className="flex w-[480px] flex-col bg-white sm:rounded-md sm:drop-shadow">
          <div className="hidden h-15 w-full items-center justify-between border-b sm:flex sm:px-5">
            <h2 className="w-9"></h2>
            <h2 className="list-title">連結錢包</h2>
            <button
              className="list-title text-custom-blue"
              onClick={() => console.log('redirect to callbackURL')}
            >
              略過
            </button>
          </div>
          <div className="flex flex-col items-center gap-6 px-5 py-10 sm:px-10">
            <p className="subtitle-1 text-center text-primary-700">
              新增/連結錢包即可獲得 100 READr Coin
              (READR)！不確定這裡要寫什麼，先留個兩行
            </p>
            <div className="w-full max-w-[320px]">
              <Button
                size="lg"
                color="white"
                icon={{ iconName: 'icon-dynamicxyz', size: 'm' }}
                text="以Dynamic繼續"
                onClick={() => router.push('/wallet')}
              />
            </div>
            <p className="footnote text-primary-400">
              READr Coin (READR) 是什麼？
              <Link href={'/'}>
                <span className="text-primary-700 underline underline-offset-2">
                  了解更多
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
