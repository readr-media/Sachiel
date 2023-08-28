import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { GOOGLE_ADSENSE_AD_CLIENT } from '~/constants/environment-variables'
import { ENV } from '~/constants/environment-variables'
import { getAdParam, getAdParamBySlot } from '~/utils/ad'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    adsbygoogle: { [key: string]: unknown }[]
  }
}

type StyleProps = {
  $adSize?: number[]
}

const Ad = styled.ins<StyleProps>`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: ${({ $adSize }) => ($adSize ? `${$adSize[0]}px` : 'unset')};
  height: ${({ $adSize }) => ($adSize ? `${$adSize[1]}px` : 'unset')};

  /**
  * Hide Ad when no ads were returned and the ad unit is empty.
  * ref: https://support.google.com/adsense/answer/10762946?hl=en
  */
  &[data-ad-status='unfilled'] {
    display: none !important;
  }
`

type AdsenseProps = {
  pageKey?: string
  adKey?: string
  slot?: string
  className?: string
  layout?: string
  layoutKey?: string
  format?: string
  responsive?: 'true' | 'false'
}
export default function Adsense({
  pageKey,
  adKey,
  slot,
  className,
  format = '',
  responsive = 'false',
  layout = '',
  layoutKey = '',
  ...rest
}: AdsenseProps) {
  const [adUnit, setAdUnit] = useState('')
  const [adSlot, setAdSlot] = useState('')
  const [adSize, setAdSize] = useState([0, 0])
  const [adTest, setAdTest] = useState('off')

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
        ;((window as Window).adsbygoogle =
          (window as Window).adsbygoogle || []).push({})
      }
    } catch (err) {
      // console.log(err)
    }
  }, [adSize, adSlot])

  return (
    <Ad
      id={adUnit}
      className={`adsbygoogle ${className}`}
      data-ad-client={GOOGLE_ADSENSE_AD_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      data-adtest={adTest}
      data-ad-layout={layout}
      data-ad-layout-key={layoutKey}
      $adSize={adSize}
      {...rest}
    />
  )
}
