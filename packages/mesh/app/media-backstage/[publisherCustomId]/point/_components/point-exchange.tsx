import { useEffect, useState } from 'react'

import type { PublisherData } from '@/app/actions/publisher'
import { getExchangePublisherInfo } from '@/app/actions/publisher'
import AlchemyAuth from '@/components/alchemy/alchemy-auth'
import Spinner from '@/components/spinner'
import { isHexAddress } from '@/utils/alchemy/address'

import ExchangeInfo from './exchange-info'

export default function PointExchange({
  balance,
  publisherCustomId,
}: {
  balance: number | undefined
  publisherCustomId: string
}) {
  const [officialWalletAddress, setOfficialWalletAddress] =
    useState<`0x${string}`>('0x')
  const [publisher, setPublisher] = useState<PublisherData | null>(null)

  useEffect(() => {
    const prepareExchangeData = async () => {
      const { publisher, officialWalletAddress } =
        await getExchangePublisherInfo(publisherCustomId)

      if (
        !publisher ||
        !officialWalletAddress ||
        !isHexAddress(officialWalletAddress)
      ) {
        console.error(
          'Exchange info not sufficient, ',
          publisher,
          officialWalletAddress
        )
        throw new Error('Exchagne info not sufficient')
      }
      setOfficialWalletAddress(officialWalletAddress)
      setPublisher(publisher)
    }
    prepareExchangeData()
  }, [publisherCustomId])

  if (!publisher || !isHexAddress(officialWalletAddress)) {
    return <Spinner />
  }

  return (
    <div className="flex grow flex-col">
      <AlchemyAuth
        hasAlchemyAccount={true}
        renderComponent={
          <div className="grow bg-white p-10">
            <ExchangeInfo
              publisher={publisher}
              balance={balance}
              recipientAddress={officialWalletAddress}
            />
          </div>
        }
      />
    </div>
  )
}
