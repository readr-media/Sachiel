'use client'

import { useParams, useRouter } from 'next/navigation'

import { useT } from '@/app/i18n/client'
import Button from '@/components/button'
import { guest, useUser } from '@/context/user'

import DeletionResultHeader from './result-header'

export default function Success() {
  const router = useRouter()
  const { lng } = useParams()
  const { setUser } = useUser()
  const { t } = useT('pages/setting')

  const handleClick = async () => {
    setUser(guest)
    router.push(`/${lng}`) // Language-aware redirect
  }

  return (
    <>
      <DeletionResultHeader />
      <section className="flex w-full flex-col items-center justify-center sm:h-screen sm:bg-multi-layer-light">
        <div className="flex flex-col items-center gap-y-6 bg-single-layer px-5 pt-10 sm:w-[480px] sm:rounded-md sm:p-10 sm:shadow-[0_0_4px_0_rgba(0,9,40,0.1),0_2px_2px_0_rgba(0,9,40,0.1)]">
          <div className="flex flex-col items-center">
            <p className="title-2 mb-2 text-primary-700 sm:mb-1">
              {t('deletion.successTitle', '刪除帳號成功')}
            </p>
            <p className="body-2 text-center text-primary-500">
              {t(
                'deletion.successDescription',
                '謝謝您使用我們的會員服務。如果您有需要，歡迎隨時回來 :)'
              )}
            </p>
          </div>
          <div className="w-full max-w-[295px] sm:max-w-[320px]">
            <Button
              size="lg"
              color="transparent"
              text={t('deletion.backToHome', '回首頁')}
              onClick={handleClick}
            />
          </div>
        </div>
      </section>
    </>
  )
}
