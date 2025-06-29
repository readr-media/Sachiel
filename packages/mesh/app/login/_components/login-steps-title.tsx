import { useRouter } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import Icon from '@/components/icon'
import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { loginRedirectPathKey } from '@/hooks/use-redirect-login'

export default function LoginStepsTitle() {
  const { t } = useCustomTranslation()
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
      title: t('Pages.Login.LoginStepsTitle-title-terms', '服務條款'),
      goBackTo: LoginState.Entry,
    },
    [LoginState.Email]: {
      title: t('Pages.Login.LoginStepsTitle-title-email', 'Email'),
      goBackTo: LoginState.Entry,
    },
    [LoginState.EmailConfirmation]: {
      title: t('Pages.Login.LoginStepsTitle-title-email-confirm', '確認收件匣'),
      goBackTo: LoginState.Email,
    },
    [LoginState.SetCategory]: {
      title: t('Pages.Login.LoginStepsTitle-title-set-category', '新聞類別'),
      goBackTo: LoginState.SetName,
    },
    [LoginState.SetFollowing]: {
      title: t('Pages.Login.LoginStepsTitle-title-set-following', '推薦追蹤'),
      goBackTo: LoginState.SetCategory,
    },
    [LoginState.WebviewHint]: {
      title: t('Pages.Login.LoginStepsTitle-title-webview-hint', '註冊／登入'),
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
        <h2 className="list-title mx-auto">
          {t('Pages.Login.LoginStepsTitle-title-set-name', '姓名')}
        </h2>
      )
    case LoginState.SetWallet:
      return (
        <div className="flex w-full px-5">
          <div className="w-9"></div>
          <h2 className="list-title mx-auto">
            {t('Pages.Login.LoginStepsTitle-title-set-wallet', '連結錢包')}
          </h2>
          <button
            className="list-title text-custom-blue"
            onClick={handleSkipButton}
          >
            {t('Pages.Login.LoginStepsTitle-skip', '略過')}
          </button>
        </div>
      )
  }
}
