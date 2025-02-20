import Script from 'next/script'

export default function AdManagerScript() {
  return (
    <Script
      async
      src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
      crossOrigin="anonymous"
    />
  )
}
