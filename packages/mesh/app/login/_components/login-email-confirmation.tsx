import { LoginState, useLogin } from '@/context/login'
import useCountdown from '@/hooks/use-countdown'
import { sendEmailLink } from '@/utils/auth-provider'

export default function LoginEmailConfirmation() {
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
          我們已將登入連結寄到 {email}，請點擊信件中的連結登入。
        </p>
        <p className="footnote text-center text-primary-400">
          沒收到信件？請檢查垃圾信件匣
        </p>
        <p className="footnote pb-5 text-center text-primary-400">
          或
          <button
            className="text-primary-700 underline underline-offset-2"
            onClick={resendEmail}
            disabled={countdown > 0}
          >
            重新發送信件 {countdown === 0 ? '' : `(${countdown}s)`}
          </button>
        </p>
        <button
          className="footnote w-full text-center text-primary-700 underline underline-offset-2"
          onClick={() => {
            setStep(LoginState.Entry)
          }}
        >
          嘗試其他登入方式
        </button>
      </div>
    </div>
  )
}
