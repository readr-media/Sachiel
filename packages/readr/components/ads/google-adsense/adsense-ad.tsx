import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ADSENSE_UNITS } from '~/constants/ad'
import { GOOGLE_ADSENSE_AD_CLIENT } from '~/constants/environment-variables'

type AdProps = {
  pageKey?: string // key to access GPT_UNITS first layer
  adKey?: string // key to access GPT_UNITS second layer, might need to complete with device
  adSlot?: string
  className?: string // for styled-component method to add styles
  layout?: string
  layoutKey?: string
  format?: string
  responsive?: string
  adTest?: string
  width?: string
  height?: string
}

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

const Ad = styled.ins`
  display: block;
  margin: auto;

  /**
  * Hide Ad when no ads were returned and the ad unit is empty.
  * ref: https://support.google.com/adsense/answer/10762946?hl=en
  */
  &[data-ad-status='unfilled'] {
    display: none !important;
  }
`

export default function Adsense({
  pageKey,
  adKey,
  adSlot = '',
  format = '',
  responsive = 'false',
  adTest = 'on',
  className,
  layout = '',
  layoutKey = '',
  ...rest
}: AdProps) {
  const [slot, setSlot] = useState('')
  const [adSize, setAdSize] = useState({})

  useEffect(() => {
    if (pageKey && adKey) {
      // built-in ad unit
      const adSlotParam = (ADSENSE_UNITS[pageKey] as any)[adKey]
      if (!adSlotParam) {
        return
      }

      const { adSlot, adSize } = adSlotParam
      setSlot(adSlot)
      setAdSize({ width: `${adSize[0]}px`, height: `${adSize[1]}px` })
    } else if (adSlot) {
      // custom ad unit string
      setSlot(adSlot)
    } else {
      console.error(
        `Adsense Ad not receive necessary pageKey '${pageKey}' and adKey '${adKey}' or '${adSlot}'`
      )
      return
    }
  }, [adKey, pageKey, adSlot])

  useEffect(() => {
    try {
      if (typeof window === 'object') {
        ;((window as Window).adsbygoogle =
          (window as Window).adsbygoogle || []).push({})
      }
    } catch (err) {
      //
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Ad
      className={`adsbygoogle ${className}`}
      data-ad-client={GOOGLE_ADSENSE_AD_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-adtest={adTest}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      {...rest}
    />
  )
}
