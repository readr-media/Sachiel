import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getCurrentUser } from '@/app/actions/auth'
import { getMemberSponsorRecord } from '@/app/actions/sponsorship'
import Icon from '@/components/icon'
import PublisherDonateButton from '@/components/publisher-card/donate-button'

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) notFound()
  const response = await getMemberSponsorRecord(memberId)
  const sponsorRecord = response.filter((data) => data.sponsoredCount !== 0)

  return (
    <div className="pt-0 sm:pt-[68px]">
      <div className="flex h-15 w-full flex-row items-center border-b bg-white">
        <Link href={'/point'}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </Link>
        <h2 className="list-title mx-auto sm:ml-6">已贊助媒體</h2>
        <div className="size-5 px-5"></div>
      </div>
      {sponsorRecord.length === 0 ? (
        <div className="flex h-[calc(100vh-124px)] items-center justify-center bg-multi-layer-light sm:h-[calc(100vh-445px)] sm:bg-transparent">
          <p className="button-large w-dvw text-center text-primary-400">
            目前還沒有贊助紀錄
          </p>
        </div>
      ) : (
        <div className="flex justify-center sm:p-5">
          <div className="grid w-[600px] grid-cols-1 rounded-md bg-white sm:px-5 sm:py-2 sm:drop-shadow lg:w-[900px] lg:grid-cols-2 lg:gap-x-5 xl:w-[1040px]">
            {sponsorRecord.map((record, index) => {
              const isLastItem = index >= sponsorRecord.length - 2
              return (
                <>
                  <div
                    key={record.publisherId}
                    className={`flex flex-row items-center ${
                      isLastItem ? 'border-b-0' : 'border-b'
                    } p-5 `}
                  >
                    <Image
                      src={
                        record.publisherLogo ||
                        '/images/default-avatar-image.png'
                      }
                      width={40}
                      height={40}
                      alt={`${record.publisherTitle}-logo`}
                      style={{
                        borderRadius: '8px',
                        backgroundColor: '#E0E0E0',
                      }}
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
                      <PublisherDonateButton />
                    </div>
                  </div>
                  {index === sponsorRecord.length - 2 ? (
                    <div className="border-b lg:hidden"></div>
                  ) : null}
                </>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
