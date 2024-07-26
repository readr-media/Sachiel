import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/components/button'

export default function LoginSetWallet() {
  const router = useRouter()
  return (
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
          onClick={() => router.push('/point')}
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
  )
}
