import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import Button from '@/components/button'
import { LoginState, useLogin } from '@/context/login'
import {
  type LoginMethod,
  handleAuthProvider,
  loginOptions,
} from '@/utils/auth-provider'
import { isInAppBrowser } from '@/utils/login'

export default function LoginEntry() {
  const t = useTranslations('Pages.Login')
  const [isWebView, setIsWebView] = useState(false)
  const { setStep } = useLogin()

  const onClickLoginMethod = async (method: LoginMethod) => {
    if (isWebView) {
      setStep(LoginState.WebviewHint)
      return
    }
    if (method === 'email') {
      setStep(LoginState.Email)
    } else {
      await handleAuthProvider(method)
    }
  }

  useEffect(() => {
    setIsWebView(isInAppBrowser(window.navigator.userAgent))
  }, [])

  return (
    <div className="flex flex-col gap-6 p-10">
      <div className="flex flex-col items-center gap-2">
        <h2 className="title-1 text-primary-700">{t('LoginEntry-title')}</h2>
        <p className="body-3 text-primary-500">{t('LoginEntry-description')}</p>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        {/* 因第三方因素，暫時停用 facebook login 機制 */}
        {/* 因privaterelay，暫時停用 apple login 機制 */}
        {loginOptions
          .filter(
            (option) =>
              option.method !== 'facebook' && option.method !== 'apple'
          )
          .map((option) => (
            <div
              className={`w-full max-w-[320px] GTM-login_click_${option.method}`}
              key={`login-with-${option.method}`}
            >
              <Button
                size="lg"
                color="white"
                text={
                  option.method
                    ? t('LoginEntry-continue-with-text', {
                        text: transformedBtnText(option.method),
                      })
                    : ''
                }
                icon={{ iconName: option.iconName, size: 'm' }}
                onClick={() => onClickLoginMethod(option.method)}
              />
            </div>
          ))}
      </div>
      <p className="footnote text-center text-primary-400">
        {t('LoginEntry-hint-1')}
        <Link href={'/policy/terms-of-service'}>
          <span className="text-primary-700 underline underline-offset-2">
            {t('LoginEntry-hint-2')}
          </span>
        </Link>
        {t('LoginEntry-hint-3')}
        <Link href={'/policy/privacy-policy'}>
          <span className="text-primary-700 underline underline-offset-2">
            {t('LoginEntry-hint-4')}
          </span>
        </Link>
      </p>
    </div>
  )
}

function transformedBtnText(text: string) {
  if (!text) return ''
  const capitalizeFirstLetter = text.charAt(0).toUpperCase() + text.slice(1)
  return capitalizeFirstLetter
}
