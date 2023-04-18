import styled from 'styled-components'

const EmbeddedWrapper = styled.div`
  z-index: 1000;
  outline: 1px solid red;
`

type LeadingEmbeddedCodeProps = {
  embeddedCode: string
}

export default function FirstEmbeddedCode({
  embeddedCode,
}: LeadingEmbeddedCodeProps): JSX.Element {
  return (
    <EmbeddedWrapper>
      <div dangerouslySetInnerHTML={{ __html: embeddedCode }} />
    </EmbeddedWrapper>
  )
}
