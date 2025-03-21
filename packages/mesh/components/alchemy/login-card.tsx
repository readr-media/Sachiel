'use client'

import { useAuthenticate, useSignerStatus } from '@alchemy/aa-alchemy/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type FormEvent } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { ENV } from '@/constants/config'
import { useUser } from '@/context/user'

import { Card } from './card'

export const LogInCard = ({
  formDescription,
  isHelperText,
}: {
  formDescription: string
  isHelperText: boolean
}) => {
  const t = useTranslations('Components.LogInCard')
  const { user } = useUser()
  const { authenticate } = useAuthenticate()
  const { status } = useSignerStatus()
  const pathname = usePathname()
  const isAwaitingEmail = status === 'AWAITING_EMAIL_AUTH'
  const email = user.email

  const login = (evt: FormEvent<HTMLFormElement>) => {
    if (!email) return
    evt.preventDefault()
    authenticate({ type: 'email', email })
    localStorage.setItem('alchemy-redirect', pathname)
  }

  return (
    <Card>
      {isAwaitingEmail ? (
        <div className="">
          <div className="flex flex-col items-center gap-4">
            <Icon
              iconName="icon-check-email"
              size={{ width: 64, height: 64 }}
            />
            <p className="subtitle-1 text-center">
              {t('login-mail-has-sent', { email })}
            </p>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col items-center justify-start gap-6 sm:justify-center"
          onSubmit={login}
        >
          <Icon iconName="icon-send-email" size={{ width: 64, height: 64 }} />
          <div className="flex flex-col gap-1">
            {isHelperText ? null : (
              <p className="title-2 text-center text-primary-700">
                {t('login-again')}
              </p>
            )}
            <p className="body-2 text-center text-primary-500">
              {formDescription}
            </p>
          </div>
          <div className="flex w-full justify-center">
            <div className="max-w-[320px] shrink-0 grow">
              <input type="email" value={email} readOnly className="hidden" />
              <Button
                type="submit"
                size="lg"
                color="primary"
                text={t('resend-login-mail')}
              />
            </div>
          </div>
          {isHelperText ? (
            <p className="footnote text-center text-primary-400">
              {t('what-is-mesh-point')}
              {/* TODO: 待點數說明頁面完成，更新連結 */}
              <Link href={ENV === 'prod' ? '/story/53192' : '/'}>
                <span className="text-primary-700 underline underline-offset-2">
                  {t('learn-more')}
                </span>
              </Link>
            </p>
          ) : null}
        </form>
      )}
    </Card>
  )
}
