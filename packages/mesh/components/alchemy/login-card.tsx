'use client'

import { useAuthenticate, useSignerStatus } from '@alchemy/aa-alchemy/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FormEvent } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { ENV } from '@/constants/config'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

import { Card } from './card'

export const LogInCard = ({
  formDescription,
  isHelperText,
}: {
  formDescription: string
  isHelperText: boolean
}) => {
  const { user } = useUser()
  const { authenticate } = useAuthenticate()
  const { status } = useSignerStatus()
  const pathname = usePathname()
  const isAwaitingEmail = status === 'AWAITING_EMAIL_AUTH'
  const email = user.email
  const { t } = useCustomTranslation()

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
              我們已將錢包登入連結寄到 {email}，請點擊信件中的連結。
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
                重新登入錢包
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
                text={t(
                  'Components.AlchemyLoginCard.send-login-link',
                  '發送登入連結'
                )}
              />
            </div>
          </div>
          {isHelperText ? (
            <p className="footnote text-center text-primary-400">
              讀選點數是什麼？
              {/* TODO: 待點數說明頁面完成，更新連結 */}
              <Link href={ENV === 'prod' ? '/story/53192' : '/'}>
                <span className="text-primary-700 underline underline-offset-2">
                  了解更多
                </span>
              </Link>
            </p>
          ) : null}
        </form>
      )}
    </Card>
  )
}
