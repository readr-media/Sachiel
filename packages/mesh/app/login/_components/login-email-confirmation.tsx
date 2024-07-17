import { sendSignInLinkToEmail } from 'firebase/auth'
import { useEffect, useState } from 'react'

import { useLogin } from '@/context/login'
import { auth } from '@/firebase/client'

const actionCodeSettings = {
  url: `https://localhost:3000/login`,
  handleCodeInApp: true,
  dynamicLinkDomain: 'readrdev.page.link',
}

export default function LoginEmailConfirmation() {
  const { formData, setStep } = useLogin()
  const { email } = formData
  const [countdown, setCountdown] = useState(60)

  useEffect(() => {
    const sendEmailLink = async () => {
      try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)
        window.localStorage.setItem('emailForSignIn', email)
        startCountdown()
      } catch (error) {
        console.error(error)
      }
    }

    sendEmailLink()
  }, [email])

  const startCountdown = () => {
    setCountdown(60)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 0) {
          return prev - 1
        } else {
          clearInterval(interval)
          return 0
        }
      })
    }, 1000)
  }

  const resendEmail = async () => {
    if (countdown === 0) {
      try {
        await sendSignInLinkToEmail(auth, email, actionCodeSettings)
        window.localStorage.setItem('emailForSignIn', email)
        setCountdown(60)
      } catch (error) {
        console.error(error)
      }
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
            setStep('entry')
          }}
        >
          嘗試其他登入方式
        </button>
      </div>
    </div>
  )
}
