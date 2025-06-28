'use client'
import { useEffect } from 'react'

import { MISO_API_KEY } from '@/constants/config'
import { useUser } from '@/context/user'

export default function MisoPageView({ productIds }: { productIds: string }) {
  const { user } = useUser()

  useEffect(() => {
    const misocmd = window.misocmd || (window.misocmd = [])
    misocmd.push(() => {
      const MisoClient = window.MisoClient
      const client = new MisoClient(MISO_API_KEY)
      if (user?.memberId) {
        client.context.user_id = user.memberId
      }
      client.api.interactions.upload({
        type: 'product_detail_page_view',
        product_ids: [`mesh_${productIds}`],
      })
    })
  }, [productIds, user.memberId])

  return <></>
}
