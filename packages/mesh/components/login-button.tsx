import { useTranslations } from 'next-intl'

import useRedirectLogin from '@/hooks/use-redirect-login'

import Button from './button'

export default function LoginButton() {
  const t = useTranslations('Components.LoginButton')
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()

  return (
    <div className="mx-3 my-1 flex items-center">
      <Button
        size="sm"
        color="white"
        text={t('login')}
        onClick={detectIfShouldRedirectToLogin}
      />
    </div>
  )
}
