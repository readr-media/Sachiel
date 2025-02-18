'use client'

import { useEffect, useState } from 'react'

import { GAM_UNITS } from '@/constants/ad'
import { getAdFullKey, getAdUnitPath } from '@/utils/ad'

type Props = {
  pageKey: string
  adKey: string
}

export default function AdManagerPopUp({ pageKey, adKey }: Props) {
  const [adSlot, setAdSlot] = useState('')
  const [adUnitPath, setAdUnitPath] = useState('')
  const [adSize, setAdSize] = useState('')

  useEffect(() => {
    const width = window.innerWidth
    const adFullKey = getAdFullKey(adKey, width)
    const adData = GAM_UNITS[pageKey]?.[adFullKey]
    if (!adData) {
      return
    }
    const { adUnit, adSize, adSlot } = adData
    if (window.googletag && adUnit && adSize && adSlot) {
      setAdSlot(adSlot)
      const unitPath = getAdUnitPath(adUnit)
      setAdUnitPath(unitPath)
      setAdSize(JSON.stringify(adSize))
    }
  }, [pageKey, adKey])

  if (!adSlot || !adUnitPath || !adSize) return null

  return (
    <script
      src="//cdn2.sales-frontier.com/adtype/pdpopup/sfpdpopexp.js"
      type="text/javascript"
      async
      id={adSlot}
      sf-dfp-path={adUnitPath}
      sf-dfp-size={adSize}
    />
  )
}
