import {
  browserLocalPersistence,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  setPersistence,
  signInWithRedirect,
} from 'firebase/auth'
import Link from 'next/link'

import Button from '@/components/button'
import { useLogin } from '@/context/login'
import { auth } from '@/firebase/client'
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
type LoginMethod = typeof loginOptions[number]['method']

export default function LoginEntry() {
  const { setStep } = useLogin()

  const handleLoginMethod = async (method: LoginMethod) => {
    if (method === 'email') {
      setStep('email')
      return
    }

    const provider = createAuthProvider(method)
    if (provider) {
      await setPersistence(auth, browserLocalPersistence)
      await signInWithRedirect(auth, provider)
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
              onClick={() => handleLoginMethod(option.method)}
            />
          </div>
        ))}
      </div>
      <p className="footnote text-center text-primary-400">
        繼續使用代表您同意與接受我們的
        <Link href={'/'}>
          {/* TODO: URL need updated */}
          <span className="text-primary-700 underline underline-offset-2">
            《服務條款》
          </span>
        </Link>
        及
        <Link href={'/'}>
          {/* TODO: URL need updated */}
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

function createAuthProvider(method: LoginMethod) {
  let provider = null
  switch (method) {
    case 'apple':
      provider = new OAuthProvider('apple.com')
      break
    case 'facebook':
      provider = new FacebookAuthProvider()
      break
    case 'google':
      provider = new GoogleAuthProvider()
      break
    default:
      return null
  }
  provider.addScope('email')
  return provider
}
