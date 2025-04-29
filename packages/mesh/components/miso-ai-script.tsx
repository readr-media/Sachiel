import Script from 'next/script'

export default function MisoAiScript() {
  return (
    <Script
      async
      src="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@1.11.5/dist/umd/miso.min.js"
    />
  )
}
