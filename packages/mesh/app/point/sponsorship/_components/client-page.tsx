'use client'

import { Fragment } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import type { getMemberSponsorRecord } from '@/app/actions/sponsorship'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import { ImageCategory } from '@/constants/fallback-src'
import { useCustomTranslation } from '@/hooks/use-custom-translation'

type SponsorRecords = Awaited<ReturnType<typeof getMemberSponsorRecord>>

export default function ClientPage({
  sponsorRecords,
}: {
  sponsorRecords: SponsorRecords
}) {
  const { t } = useCustomTranslation()

  return (
    <div>
      {sponsorRecords.length === 0 ? (
        <div className="flex h-[calc(100vh-124px)] items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-445px)] sm:bg-transparent">
          <p className="button-large w-dvw text-center text-primary-400">
            {t(
              'Pages.Point-Sponsorship.Page-no-record',
              '目前還沒有訂閱中的文章'
            )}
          </p>
        </div>
      ) : (
        <div className="flex justify-center sm:p-5">
          <div className="grid w-articleMain grid-cols-1 rounded-md bg-white sm:px-5 sm:py-2 sm:drop-shadow lg:w-[900px] lg:grid-cols-2 lg:gap-x-5 xl:w-[1040px]">
            {sponsorRecords.map((record, index) => {
              const isLastItem = index >= sponsorRecords.length - 2
              return (
                <Fragment key={record.publisherId}>
                  <div
                    key={record.publisherId}
                    className={`flex flex-row items-center ${
                      isLastItem ? 'border-b-0' : 'border-b'
                    } p-5 `}
                  >
                    <ImageWithFallback
                      src={record.publisherLogo ?? ''}
                      width={40}
                      height={40}
                      alt={`${record.publisherTitle}-logo`}
                      style={{
                        borderRadius: '8px',
                        backgroundColor: '#E0E0E0',
                      }}
                      fallbackCategory={ImageCategory.AVATAR}
                    />
                    <div className="flex flex-col gap-0.5 pl-3">
                      <p className="subtitle-2 text-primary-700">
                        {record.publisherTitle}
                      </p>
                      <p className="caption-1">
                        <span className="text-primary-500">
                          {t(
                            'Pages.Point-Sponsorship.Page-already-sponsored',
                            '已贊助'
                          )}
                        </span>
                        <span className="text-custom-blue">
                          {record.sponsoredCount}
                          {t(
                            'Pages.Point-Sponsorship.Page-sponsor-count-unit',
                            '次'
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="ml-auto">
                      <PublisherDonateButton publisherId={record.publisherId} />
                    </div>
                  </div>
                  {index === sponsorRecords.length - 2 ? (
                    <div className="border-b lg:hidden"></div>
                  ) : null}
                </Fragment>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
