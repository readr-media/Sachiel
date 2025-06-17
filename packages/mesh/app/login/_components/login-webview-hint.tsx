import { useEffect, useRef } from 'react'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { detectMobileOs } from '@/utils/login'

export default function LoginWebviewHint() {
  const { t } = useCustomTranslation()
  const intentURL = useRef('')

  useEffect(() => {
    const currentUrl = window.location.href

    const mobileOS = detectMobileOs(window.navigator.userAgent)
    if (mobileOS === 'ios') {
      /** @see https://christiantietze.de/posts/2023/05/safari-for-mac-url-scheme/ */
      const urlWithoutPrefix = currentUrl.replace(
        `${window.location.protocol}//`,
        ''
      )

      intentURL.current = `x-safari-https://${urlWithoutPrefix}`
    } else if (mobileOS === 'android') {
      /** @see https://stackoverflow.com/a/58342222 */
      intentURL.current = `intent:${currentUrl}#Intent;end`
    } else {
      console.error('mobileOS not support', window.navigator.userAgent)
    }
  }, [])

  const openInExternalBrowser = () => {
    window.location.href = intentURL.current
  }

  return (
    <div className="flex flex-col items-center gap-6 py-10 sm:p-10">
      <div className="flex flex-col items-center gap-4">
        <Icon
          iconName="icon-open-in-browser"
          size={{ width: 64, height: 64 }}
        />
        <div className="flex flex-col items-center gap-1">
          <div className="title-2 text-primary-700">
            {t('Pages.Login.LoginWebviewHint-title', '以外部瀏覽器開啟')}
          </div>
          <div className="body-2 text-primary-500">
            {t(
              'Pages.Login.LoginWebviewHint-detail',
              '請用瀏覽器開啟此網址以繼續登入'
            )}
          </div>
        </div>
      </div>
      <div className="w-[295px] sm:w-[240px]">
        <Button
          size="lg"
          color="primary"
          text={t('Pages.Login.LoginWebviewHint-action', '以外部瀏覽器開啟')}
          onClick={openInExternalBrowser}
        />
      </div>
    </div>
  )
}
