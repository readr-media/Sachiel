import Link from 'next/link'

import Button from '@/components/button'
import Icon from '@/components/icon'

import { useLogin } from '../page'

const loginOptions = [
  {
    method: 'apple',
    iconName: 'icon-apple',
  },
  {
    method: 'facebook',
    iconName: 'icon-facebook-square',
  },
  {
    method: 'google',
    iconName: 'icon-google',
  },
  {
    method: 'email',
    iconName: 'icon-email',
  },
] as const

export default function LoginEntry() {
  const { setProcess } = useLogin()
  return (
    <div className="flex h-full flex-col items-center bg-white sm:bg-gray-50">
      <div className="flex h-15 w-full flex-row items-center justify-center border-b sm:hidden">
        <Icon size={{ width: 100, height: 44 }} iconName="icon-readr-logo" />
      </div>
      <div className="flex w-full justify-center sm:h-full sm:items-center">
        <div className="flex flex-col gap-6 bg-white p-10 sm:h-[440px] sm:w-[480px] sm:rounded-md sm:drop-shadow">
          <div className="flex flex-col items-center gap-2">
            <h2 className="title-1 text-primary-700">註冊/登入會員</h2>
            <p className="body-3 text-primary-500">
              加入討論，並享受個人化新聞選讀體驗
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-3">
            {loginOptions.map((option) => (
              <div
                className="w-full max-w-[320px]"
                key={`login-with-${option.method}`}
              >
                <Button
                  size="lg"
                  color="white"
                  text={transformedBtnText(option.method)}
                  icon={{ iconName: option.iconName, size: 'm' }}
                  onClick={() => setProcess('email')}
                />
              </div>
            ))}
          </div>
          <p className="footnote text-center text-primary-400">
            繼續使用代表您同意與接受我們的
            <Link href={'/'}>
              <span className="text-primary-700 underline underline-offset-2">
                《服務條款》
              </span>
            </Link>
            及
            <Link href={'/'}>
              <span className="text-primary-700 underline underline-offset-2">
                《隱私政策》
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function transformedBtnText(text: string) {
  if (!text) return ''
  const capitalizeFirstLetter = text.charAt(0).toUpperCase() + text.slice(1)
  return `以 ${capitalizeFirstLetter} 帳號繼續`
}
