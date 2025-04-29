'use client'

import { useTranslations } from 'next-intl'

import type { getMemberSingleTransaction } from '@/app/actions/transaction'
import MeshPointHelper from '@/app/point/_components/mesh-point-helper'
import Icon from '@/components/icon'
import { displayTime } from '@/utils/story-display'

type SigleTransactionData = NonNullable<
  Awaited<ReturnType<typeof getMemberSingleTransaction>>
>

export default function ClientPage({
  data,
  balance,
}: {
  data: SigleTransactionData
  balance?: number
}) {
  const t = useTranslations('Pages.Point-Record')
  return (
    <main className="sm:p-5 xl:p-10">
      <div className="bg-white sm:rounded-md sm:drop-shadow">
        <section className="flex flex-col items-center justify-center gap-4 border-b-[0.5px] border-primary-200 py-8 sm:flex-row sm:justify-between sm:px-10">
          <div className="flex flex-col justify-center gap-2 sm:flex-col-reverse sm:self-end">
            <div className="flex flex-row items-center gap-1">
              <Icon iconName="icon-mesh-point" size="m" className="size-6" />
              {data.isIncome ? (
                <p className="hero-title text-custom-blue">
                  +{data.transactionAmount}
                </p>
              ) : (
                <p className="hero-title text-primary-700">
                  {data.transactionAmount}
                </p>
              )}
            </div>
            <MeshPointHelper />
          </div>
          <p className="footnote text-primary-400 sm:self-end">
            {data.isIncome
              ? t('Page-receive-at-time', { time: displayTime(data.createdAt) })
              : t('Page-pay-at-time', { time: displayTime(data.createdAt) })}
          </p>
        </section>
        <section className="flex flex-col gap-6 p-5 sm:p-10">
          <div className="flex flex-col gap-2">
            <p className="subtitle-2 text-primary-500">{t('Page-name')}</p>
            <p className="subtitle-1 text-primary-700">
              {data.transactionTitle}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="subtitle-2 text-primary-500">{t('Page-balance')}</p>
            <div className="flex flex-row items-center justify-start gap-1">
              <Icon iconName="icon-mesh-point" size="m" className="size-6" />
              <p className="subtitle-1 text-primary-700">
                {balance?.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
