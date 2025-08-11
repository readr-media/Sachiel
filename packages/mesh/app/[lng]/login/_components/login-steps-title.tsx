'use client'
import { useRouter } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { useT } from '@/app/i18n/client'
import Icon from '@/components/icon'
import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'
import { useUser } from '@/context/user'
import { loginRedirectPathKey } from '@/hooks/use-redirect-login'

export default function LoginStepsTitle() {
  const { t } = useT('components/login')
  const { step, setStep } = useLogin()
  const router = useRouter()
  const { setUser } = useUser()

  const chevronMap: Pick<
    Record<LoginStepsKey, { title: string; goBackTo: LoginStepsKey }>,
    | typeof LoginState.Email
    | typeof LoginState.TermsConfirmation
    | typeof LoginState.EmailConfirmation
    | typeof LoginState.SetCategory
    | typeof LoginState.SetFollowing
    | typeof LoginState.WebviewHint
  > = {
    [LoginState.TermsConfirmation]: {
      title: t('steps.terms', '服務條款'),
      goBackTo: LoginState.Entry,
    },
    [LoginState.Email]: {
      title: t('steps.email', 'Email'),
      goBackTo: LoginState.Entry,
    },
    [LoginState.EmailConfirmation]: {
      title: t('steps.emailConfirm', '確認收件匣'),
      goBackTo: LoginState.Email,
    },
    [LoginState.SetCategory]: {
      title: t('steps.setCategory', '新聞類別'),
      goBackTo: LoginState.SetName,
    },
    [LoginState.SetFollowing]: {
      title: t('steps.setFollowing', '推薦追蹤'),
      goBackTo: LoginState.SetCategory,
    },
    [LoginState.WebviewHint]: {
      title: t('steps.webviewHint', '註冊／登入'),
      goBackTo: LoginState.Entry,
    },
  }

  const handleSkipButton = async () => {
    const redirectRoute = localStorage.getItem(loginRedirectPathKey) ?? '/'
    localStorage.removeItem(loginRedirectPathKey)
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
    case LoginState.SetFollowing:
    case LoginState.WebviewHint: {
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
      return (
        <h2 className="list-title mx-auto">{t('steps.setName', '姓名')}</h2>
      )
    case LoginState.SetWallet:
      return (
        <div className="flex w-full px-5">
          <div className="w-9"></div>
          <h2 className="list-title mx-auto">
            {t('steps.setWallet', '連結錢包')}
          </h2>
          <button
            className="list-title text-custom-blue"
            onClick={handleSkipButton}
          >
            {t('buttons.skip', '略過')}
          </button>
        </div>
      )
  }
}
