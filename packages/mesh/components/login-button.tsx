import { useCustomTranslation } from '@/hooks/use-custom-translation'
import useRedirectLogin from '@/hooks/use-redirect-login'

import Button from './button'

export default function LoginButton() {
  const { t } = useCustomTranslation()
  const { detectIfShouldRedirectToLogin } = useRedirectLogin()

  return (
    <div className="mx-3 my-1 flex items-center">
      <Button
        size="sm"
        color="white"
        text={t('Components.LoginButton.login', '登入')}
        onClick={detectIfShouldRedirectToLogin}
      />
    </div>
  )
}
