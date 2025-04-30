'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { useUser } from '@/context/user'
import { useCustomTranslation } from '@/hooks/use-custom-translation'
import { PaymentType } from '@/types/payment'

import { type PublisherPolicy } from '../page'

export default function PaymentWall({
  storyId,
  policy,
}: {
  storyId: string
  policy: PublisherPolicy
}) {
  const { t } = useCustomTranslation()
  const router = useRouter()
  const { user } = useUser()
  const userId = user.memberId

  return (
    <div className="absolute inset-x-0 bottom-0">
      <div className="h-40 bg-gradient-to-t from-white"></div>
      <div className="flex justify-center bg-white">
        <div className="flex w-[335px] flex-col items-center justify-center gap-5 p-5 sm:w-[360px]">
          <Icon iconName="icon-unlock" size={{ width: 80, height: 80 }} />
          <div className="flex flex-col items-center justify-center gap-1">
            <p className="profile-title-2">
              {t('Pages.Story.PaymentWall-unlock-with-point-1', '以')}
              <span className="px-1 text-custom-blue">
                {policy?.[0].charge}{' '}
                {t('Pages.Story.PaymentWall-unlock-with-point-2', '讀選點數')}
              </span>
              {t('Pages.Story.PaymentWall-unlock-with-point-3', '解鎖文章')}
            </p>
            <p className="body-3 text-primary-500">
              {t(
                'Pages.Story.PaymentWall-unlock-duration',
                '{{duration}} 天內可無限閱讀',
                {
                  duration: policy?.[0].duration,
                }
              )}
            </p>
          </div>
          <Button
            size="lg"
            color="custom-blue"
            text={t('Pages.Story.PaymentWall-unlock-story', '解鎖文章')}
            onClick={() =>
              router.push(
                `/payment/${PaymentType.SubscriptionStory}/${storyId}`
              )
            }
          />
          {userId ? null : (
            <p className="footnote text-primary-400">
              {t('Pages.Story.PaymentWall-no-account-hint', '還沒有帳號？')}
              <Link href={'/login'}>
                <span className="text-primary-700 underline underline-offset-2">
                  {t(
                    'Pages.Story.PaymentWall-signup-for-point',
                    '免費註冊會員拿讀選點數'
                  )}
                </span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
