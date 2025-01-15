import { useRouter } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import Icon from '@/components/icon'
import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'
import { useUser } from '@/context/user'

const chevronMap: Pick<
  Record<LoginStepsKey, { title: string; goBackTo: LoginStepsKey }>,
  | typeof LoginState.Email
  | typeof LoginState.TermsConfirmation
  | typeof LoginState.EmailConfirmation
  | typeof LoginState.SetCategory
  | typeof LoginState.SetFollowing
> = {
  [LoginState.TermsConfirmation]: {
    title: '服務條款',
    goBackTo: LoginState.Entry,
  },
  [LoginState.Email]: {
    title: 'Email',
    goBackTo: LoginState.Entry,
  },
  [LoginState.EmailConfirmation]: {
    title: '確認收件匣',
    goBackTo: LoginState.Email,
  },
  [LoginState.SetCategory]: {
    title: '新聞類別',
    goBackTo: LoginState.SetName,
  },
  [LoginState.SetFollowing]: {
    title: '推薦追蹤',
    goBackTo: LoginState.SetCategory,
  },
}

export default function LoginStepsTitle() {
  const { step, setStep } = useLogin()
  const router = useRouter()
  const { setUser } = useUser()

  const handleSkipButton = async () => {
    const redirectRoute = localStorage.getItem('login-redirect') ?? '/'
    localStorage.removeItem('login-redirect')
    const userData = await getCurrentUser()
    if (userData) {
      setUser(userData)
      router.push(redirectRoute)
    } else {
      router.refresh()
    }
  }

  switch (step) {
    case LoginState.Entry:
      return (
        <div className="flex w-full justify-center">
          <Icon
            size={{ width: 144, height: 36 }}
            iconName="icon-readr-logoA-mobile"
          />
        </div>
      )
    case LoginState.Email:
    case LoginState.TermsConfirmation:
    case LoginState.EmailConfirmation:
    case LoginState.SetCategory:
    case LoginState.SetFollowing: {
      const { title, goBackTo } = chevronMap[step]
      return (
        <>
          <button onClick={() => setStep(goBackTo)}>
            <Icon
              iconName="icon-chevron-left-hover"
              size="m"
              className="ml-5"
            />
          </button>
          <h2 className="list-title mx-auto">{title}</h2>
          <div className="size-5 px-5"></div>
        </>
      )
    }
    case LoginState.SetName:
      return <h2 className="list-title mx-auto">姓名</h2>
    case LoginState.SetWallet:
      return (
        <div className="flex w-full px-5">
          <div className="w-9"></div>
          <h2 className="list-title mx-auto">連結錢包</h2>
          <button
            className="list-title text-custom-blue"
            onClick={handleSkipButton}
          >
            略過
          </button>
        </div>
      )
  }
}
