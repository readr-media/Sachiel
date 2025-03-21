import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { getCurrentUser } from '@/app/actions/auth'
import Icon from '@/components/icon'
import { type LoginStepsKey, LoginState, useLogin } from '@/context/login'
import { useUser } from '@/context/user'
import { loginRedirectPathKey } from '@/hooks/use-redirect-login'

const chevronMap: Pick<
  Record<LoginStepsKey, { titleKey: string; goBackTo: LoginStepsKey }>,
  | typeof LoginState.Email
  | typeof LoginState.TermsConfirmation
  | typeof LoginState.EmailConfirmation
  | typeof LoginState.SetCategory
  | typeof LoginState.SetFollowing
  | typeof LoginState.WebviewHint
> = {
  [LoginState.TermsConfirmation]: {
    titleKey: 'LoginStepsTitle-title-terms',
    goBackTo: LoginState.Entry,
  },
  [LoginState.Email]: {
    titleKey: 'LoginStepsTitle-title-email',
    goBackTo: LoginState.Entry,
  },
  [LoginState.EmailConfirmation]: {
    titleKey: 'LoginStepsTitle-title-email-confirm',
    goBackTo: LoginState.Email,
  },
  [LoginState.SetCategory]: {
    titleKey: 'LoginStepsTitle-title-set-category',
    goBackTo: LoginState.SetName,
  },
  [LoginState.SetFollowing]: {
    titleKey: 'LoginStepsTitle-title-set-following',
    goBackTo: LoginState.SetCategory,
  },
  [LoginState.WebviewHint]: {
    titleKey: 'LoginStepsTitle-title-webview-hint',
    goBackTo: LoginState.Entry,
  },
}

export default function LoginStepsTitle() {
  const t = useTranslations('Pages.Login')
  const { step, setStep } = useLogin()
  const router = useRouter()
  const { setUser } = useUser()

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
      const { titleKey, goBackTo } = chevronMap[step]
      return (
        <>
          <button onClick={() => setStep(goBackTo)}>
            <Icon
              iconName="icon-chevron-left-hover"
              size="m"
              className="ml-5"
            />
          </button>
          <h2 className="list-title mx-auto">{t(titleKey)}</h2>
          <div className="size-5 px-5"></div>
        </>
      )
    }
    case LoginState.SetName:
      return (
        <h2 className="list-title mx-auto">
          {t('LoginStepsTitle-title-set-name')}
        </h2>
      )
    case LoginState.SetWallet:
      return (
        <div className="flex w-full px-5">
          <div className="w-9"></div>
          <h2 className="list-title mx-auto">
            {t('LoginStepsTitle-title-set-wallet')}
          </h2>
          <button
            className="list-title text-custom-blue"
            onClick={handleSkipButton}
          >
            {t('LoginStepsTitle-skip')}
          </button>
        </div>
      )
  }
}
