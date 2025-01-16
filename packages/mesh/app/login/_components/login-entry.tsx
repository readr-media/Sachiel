import Link from 'next/link'

import Button from '@/components/button'
import { LoginState, useLogin } from '@/context/login'
import {
  type LoginMethod,
  handleAuthProvider,
  loginOptions,
} from '@/utils/auth-provider'

export default function LoginEntry() {
  const { setStep } = useLogin()

  const onClickLoginMethod = async (method: LoginMethod) => {
    if (method === 'email') {
      setStep(LoginState.Email)
    } else {
      await handleAuthProvider(method)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-10">
      <div className="flex flex-col items-center gap-2">
        <h2 className="title-1 text-primary-700">註冊/登入會員</h2>
        <p className="body-3 text-primary-500">
          加入討論，並享受個人化新聞選讀體驗
        </p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        {/* 因第三方因素，暫時停用 facebook login 機制 */}
        {loginOptions
          .filter((option) => option.method !== 'facebook')
          .map((option) => (
            <div
              className={`w-full max-w-[320px] GTM-login_click_${option.method}`}
              key={`login-with-${option.method}`}
            >
              <Button
                size="lg"
                color="white"
                text={transformedBtnText(option.method)}
                icon={{ iconName: option.iconName, size: 'm' }}
                onClick={() => onClickLoginMethod(option.method)}
              />
            </div>
          ))}
      </div>
      <p className="footnote text-center text-primary-400">
        繼續使用代表您同意與接受我們的
        <Link href={'/policy/terms-of-service'}>
          <span className="text-primary-700 underline underline-offset-2">
            《服務條款》
          </span>
        </Link>
        及
        <Link href={'/policy/privacy-policy'}>
          <span className="text-primary-700 underline underline-offset-2">
            《隱私政策》
          </span>
        </Link>
      </p>
    </div>
  )
}

function transformedBtnText(text: string) {
  if (!text) return ''
  const capitalizeFirstLetter = text.charAt(0).toUpperCase() + text.slice(1)
  return `以 ${capitalizeFirstLetter} 帳號繼續`
}
