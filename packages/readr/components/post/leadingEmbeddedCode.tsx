import { Helmet } from 'react-helmet'
import styled from 'styled-components'

const EmbeddedWrapper = styled.div`
  background: white;
`

type FirstEmbeddedCodeProps = {
  embeddedCode: string
}

export default function FirstEmbeddedCode({
  embeddedCode,
}: FirstEmbeddedCodeProps): JSX.Element {
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm
  const srcRegex = /src="([^"]*)"/
  const srcList = []

  for (const scriptMatch of embeddedCode.matchAll(scriptRegex)) {
    const srcMatch = scriptMatch?.[0].match(srcRegex)
    const src = srcMatch?.[1]
    if (src) {
      srcList.push(src)
    }
  }

  const srcLinks = srcList.map((src, index) => {
    return <link rel="preload" href={src} as="script" key={index} />
  })

  return (
    <EmbeddedWrapper>
      <Helmet>{srcLinks}</Helmet>
      <div dangerouslySetInnerHTML={{ __html: embeddedCode }} />
    </EmbeddedWrapper>
  )
}
