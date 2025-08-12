'use client'

import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

import { useABTest } from '@/context/ab-test'

export default function DataLayerLogger() {
  const { version } = useABTest()

  useEffect(() => {
    if (version) {
      const tagManagerArgs = {
        dataLayer: {
          event: 'pageview',
          page: {
            title: document.title,
            url: window.location.pathname,
            adsDisplayVersion: version,
          },
        },
      }
      TagManager.dataLayer(tagManagerArgs)
    }
  }, [version])

  return null
}
