'use client'

import { useEffect, useState } from 'react'

import { GAM_UNITS } from '@/constants/ad'
import { getAdFullKey, getAdUnitPath } from '@/utils/ad'

type Props = {
  pageKey?: string
  adKey?: string
  slot?: string
}

export default function AdManager({ pageKey, adKey, slot }: Props) {
  const [adUnitPath, setAdUnitPath] = useState('')
  const [adDivId, setAdDivId] = useState('')
  const [adSize, setAdSize] = useState<[number, number] | [number, number][]>(
    []
  )

  useEffect(() => {
    if (pageKey && adKey) {
      const width = window.innerWidth
      const adFullKey = getAdFullKey(adKey, width)
      const adData = GAM_UNITS[pageKey]?.[adFullKey]
      if (!adData) {
        return
      }
      const { adSlot, adSize, adUnit } = adData
      setAdDivId(`div-gpt-ad-${adSlot}`)
      setAdSize(adSize)
      setAdUnitPath(getAdUnitPath(adUnit))
    } else {
      console.error(
        `Adsense not receive necessary pageKey '${pageKey}' and adKey '${adKey}' or '${slot}'`
      )
      return
    }
  }, [adDivId, adKey, pageKey, slot])

  useEffect(() => {
    if (window.googletag && adSize && adDivId && adUnitPath) {
      window.googletag = window.googletag || { cmd: [] }

      window.googletag.cmd.push(() => {
        const slot = window.googletag.defineSlot(adUnitPath, adSize, adDivId)

        if (slot) {
          slot.addService(window.googletag.pubads())
          window.googletag.display(adDivId)
          window.googletag.pubads().enableSingleRequest()
          window.googletag.pubads().collapseEmptyDivs(true)
          window.googletag.enableServices()
        }
      })
    }
  }, [adSize, adUnitPath, adDivId])

  return <div id={adDivId} />
}
