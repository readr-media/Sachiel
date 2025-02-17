'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

import { GAM_UNITS } from '@/constants/ad'
import { getAdFullKey, getAdUnitPath } from '@/utils/ad'

type Props = {
  pageKey: string
  adKey: string
}

export default function AdManagerPopUp({ pageKey, adKey }: Props) {
  const [isAdReady, setIsAdReady] = useState(false)
  const [adSlot, setAdSlot] = useState('')

  useEffect(() => {
    const width = window.innerWidth
    const adFullKey = getAdFullKey(adKey, width)
    const adData = GAM_UNITS[pageKey]?.[adFullKey]
    if (!adData) {
      return
    }
    const { adUnit, adSize, adSlot } = adData

    if (window.googletag && adUnit && adSize && adSlot) {
      window.sf_dfp_path = getAdUnitPath(adUnit)
      window.sf_dfp_size = JSON.stringify(adSize)

      setAdSlot(adSlot)
      setIsAdReady(true)
    }
  }, [pageKey, adKey])

  return isAdReady ? (
    <Script
      src="//cdn2.sales-frontier.com/adtype/pdpopup/sfpdpopexp.js"
      type="text/javascript"
      id={adSlot}
    />
  ) : null
}
