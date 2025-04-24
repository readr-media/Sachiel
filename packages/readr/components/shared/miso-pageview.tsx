import { useEffect } from 'react'

import { MISO_API_KEY } from '~/constants/config'

export default function MisoPageView({ productIds }: { productIds: string }) {
  useEffect(() => {
    // @ts-ignore: Property 'misocmd' does not exist on type 'Window & typeof globalThis'.
    const misocmd = window.misocmd || (window.misocmd = [])
    misocmd.push(() => {
      // @ts-ignore: Property 'MisoClient' does not exist on type 'Window & typeof globalThis'.
      const MisoClient = window.MisoClient
      const client = new MisoClient(MISO_API_KEY)
      client.api.interactions.upload({
        type: 'product_detail_page_view',
        product_ids: [`readr_${productIds}`],
      })
    })
  }, [])

  return <></>
}
