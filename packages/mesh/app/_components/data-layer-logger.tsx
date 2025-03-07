'use client'

import { useEffect } from 'react'
import TagManager from 'react-gtm-module'

type Props = {
  version: 'A' | 'B'
}

export default function DataLayerLogger({ version }: Props) {
  useEffect(() => {
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
  }, [version])

  return null
}
