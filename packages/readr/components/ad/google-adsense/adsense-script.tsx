import { GOOGLE_ADSENSE_AD_CLIENT } from '~/constants/environment-variables'

export default function AdsenseScript() {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${GOOGLE_ADSENSE_AD_CLIENT}`}
      crossOrigin="anonymous"
    />
  )
}
