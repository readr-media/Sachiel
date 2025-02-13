'use client'

import { useEffect, useState } from 'react'

import { GAM_UNITS } from '@/constants/ad'
import { getAdFullKey, getAdParamBySlot, getMinSize } from '@/utils/ad'

type Props = {
  pageKey?: string
  adKey?: string
  slot?: string
}

export default function AdManager({ pageKey, adKey, slot }: Props) {
  const [adUnit, setAdUnit] = useState('')
  const [adDivId, setAdDivId] = useState('')
  const [adSize, setAdSize] = useState<[number, number] | [number, number][]>(
    []
  )
  const [minSize, setMinSize] = useState([0, 0])

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
      setAdUnit(adUnit)
      const minSize = getMinSize(adSize)
      setMinSize(minSize)
    } else if (slot) {
      // get adParam by slot
      const adParam = getAdParamBySlot(slot)
      if (!adParam) {
        return
      }
      const { adSize, adUnit } = adParam
      setAdDivId(`div-gpt-ad-${slot}`)
      setAdSize(adSize)
      setAdUnit(adUnit)
      const minSize = getMinSize(adSize)
      setMinSize(minSize)
    } else {
      console.error(
        `Adsense not receive necessary pageKey '${pageKey}' and adKey '${adKey}' or '${slot}'`
      )
      return
    }
  }, [adKey, pageKey, slot])

  useEffect(() => {
    if (window.googletag && adSize && adDivId && adUnit) {
      const googletag = window.googletag || { cmd: [] }
      googletag.cmd.push(() => {
        const slot = googletag
          .defineSlot(`/23277192286/${adUnit}`, adSize, adDivId)
          .addService(googletag.pubads())

        if (slot) {
          googletag.pubads().enableSingleRequest()
          googletag.pubads().collapseEmptyDivs()
          googletag.enableServices()
          googletag.display(adDivId)
        }
      })
    }
  }, [adSize, adUnit, adDivId])

  return (
    <div
      id={adDivId}
      style={{
        minWidth: `${minSize[0]}px`,
        minHeight: `${minSize[1]}px`,
      }}
    />
  )
}
