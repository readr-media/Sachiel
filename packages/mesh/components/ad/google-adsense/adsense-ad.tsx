import { useEffect, useState } from 'react'

import { ADSENSE_CLIENT } from '@/constants/config'
import { getAdParam, getAdParamBySlot } from '@/utils/ad'

type Props = {
  pageKey?: string
  adKey?: string
  slot?: string
  className?: string
  layout?: string
  layoutKey?: string
  format?: string
  responsive?: 'true' | 'false'
}

export default function AdSense({
  pageKey,
  adKey,
  slot,
  className = '',
  format = '',
  responsive = 'false',
  layout = '',
  layoutKey = '',
  ...rest
}: Props) {
  const [adUnit, setAdUnit] = useState('')
  const [adSlot, setAdSlot] = useState('')
  const [adSize, setAdSize] = useState([0, 0])

  useEffect(() => {
    if (pageKey && adKey) {
      // get adParam by pageKey & adKey
      const width = window.innerWidth
      const adParam = getAdParam(pageKey, adKey, width)
      if (!adParam) {
        return
      }

      const { adSlot, adSize, adUnit } = adParam
      setAdSlot(adSlot)
      setAdSize(adSize)
      setAdUnit(adUnit)
    } else if (slot) {
      // get adParam by slot
      const adParam = getAdParamBySlot(slot)
      if (!adParam) {
        return
      }
      const { adSize, adUnit } = adParam
      setAdSlot(slot)
      setAdSize(adSize)
      setAdUnit(adUnit)
    } else {
      console.error(
        `Adsense not receive necessary pageKey '${pageKey}' and adKey '${adKey}' or '${slot}'`
      )
      return
    }
  }, [adKey, pageKey, slot])

  useEffect(() => {
    try {
      if (typeof window === 'object' && adSize && adSlot) {
        const adsbygoogle = (window as Window).adsbygoogle || []
        adsbygoogle.push({})
      }
    } catch (err) {
      console.error(err)
    }
  }, [adSize, adSlot])

  /**
   * Hide Ad when no ads were returned and the ad unit is empty.
   * ref: https://support.google.com/adsense/answer/10762946?hl=en
   */
  return (
    <ins
      id={adUnit}
      className={`adsbygoogle m-auto block data-[ad-status=unfilled]:hidden ${className}`}
      style={{
        width: adSize ? `${adSize[0]}px` : 'unset',
        height: adSize ? `${adSize[1]}px` : 'unset',
      }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      {...rest}
    />
  )
}
