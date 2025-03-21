'use client'

import { useTranslations } from 'next-intl'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { useUser } from '@/context/user'

export default function MeshPointInfo({
  balance,
  goExchange,
}: {
  balance: number | undefined
  goExchange: () => void
}) {
  const t = useTranslations('Pages.Media-Backstage')
  const { user } = useUser()
  const doesUserOwnMultiMedia =
    user.publishers?.length && user.publishers?.length > 1
  return (
    <section className="flex flex-col gap-4 px-10 pb-6 pt-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 text-primary-500">
          <div className="profile-subtitle">{t('MeshPointInfo-title')}</div>
          <div className="flex h-8 flex-row items-center gap-1">
            <Icon iconName="icon-mesh-point" size="m" className="size-6" />
            <p className="hero-title text-primary-700">
              {balance?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          {doesUserOwnMultiMedia && (
            <div className="caption-2">{t('MeshPointInfo-point-hint')}</div>
          )}
        </div>
        <div className="w-[112px]">
          <Button
            text={t('MeshPointInfo-exchange-point')}
            onClick={goExchange}
            size="lg"
            color="custom-blue"
          />
        </div>
      </div>
      <div className="rounded-xl border-primary-200 bg-primary-100 py-3 pl-6 text-primary-600">
        {t('MeshPointInfo-settlement-hint-1')}
        <br />
        {t('MeshPointInfo-settlement-hint-2')}
      </div>
    </section>
  )
}
