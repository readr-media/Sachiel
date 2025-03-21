import { useTranslations } from 'next-intl'

import { LoginState, useLogin } from '@/context/login'
import useCountdown from '@/hooks/use-countdown'
import { sendEmailLink } from '@/utils/auth-provider'

export default function LoginEmailConfirmation() {
  const t = useTranslations('Pages.Login')
  const { formData, setStep } = useLogin()
  const { email } = formData
  const { countdown, resetCountdown } = useCountdown(60)

  const resendEmail = async () => {
    if (countdown === 0) {
      sendEmailLink(email)
      resetCountdown()
    }
  }

  return (
    <div className="flex w-full justify-center p-10">
      <div className="w-[295px]">
        <p className="subtitle-1 pb-6 text-center text-primary-700">
          {t('LoginEmailConfirmation-hint-1', { email })}
        </p>
        <p className="footnote text-center text-primary-400">
          {t('LoginEmailConfirmation-hint-2')}
        </p>
        <p className="footnote pb-5 text-center text-primary-400">
          {t('LoginEmailConfirmation-hint-3')}
          <button
            className="text-primary-700 underline underline-offset-2"
            onClick={resendEmail}
            disabled={countdown > 0}
          >
            {t('LoginEmailConfirmation-hint-4')}{' '}
            {countdown === 0 ? '' : `(${countdown}s)`}
          </button>
        </p>
        <button
          className="footnote w-full text-center text-primary-700 underline underline-offset-2"
          onClick={() => {
            setStep(LoginState.Entry)
          }}
        >
          {t('LoginEmailConfirmation-try-other-way')}
        </button>
      </div>
    </div>
  )
}
