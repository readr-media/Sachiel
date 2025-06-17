import { redirect } from 'next/navigation'
import { Fragment } from 'react'

import ImageWithFallback from '@/app/_components/image-with-fallback'
import { getCurrentUser } from '@/app/actions/auth'
import { getMemberSponsorRecord } from '@/app/actions/sponsorship'
import PublisherDonateButton from '@/components/publisher-card/donate-button'
import { ImageCategory } from '@/constants/fallback-src'

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')
  const response = await getMemberSponsorRecord(memberId)
  const sponsorRecord = response.filter((data) => data.sponsoredCount !== 0)

  return (
    <div>
      {sponsorRecord.length === 0 ? (
        <div className="flex h-[calc(100vh-124px)] items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-445px)] sm:bg-transparent">
          <p className="button-large w-dvw text-center text-primary-400">
            目前還沒有贊助紀錄
          </p>
        </div>
      ) : (
        <div className="flex justify-center sm:p-5">
          <div className="grid w-articleMain grid-cols-1 rounded-md bg-white sm:px-5 sm:py-2 sm:drop-shadow lg:w-[900px] lg:grid-cols-2 lg:gap-x-5 xl:w-[1040px]">
            {sponsorRecord.map((record, index) => {
              const isLastItem = index >= sponsorRecord.length - 2
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
                        <span className="text-primary-500">已贊助</span>
                        <span className="text-custom-blue">
                          {record.sponsoredCount}次
                        </span>
                      </p>
                    </div>
                    <div className="ml-auto">
                      <PublisherDonateButton publisherId={record.publisherId} />
                    </div>
                  </div>
                  {index === sponsorRecord.length - 2 ? (
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
