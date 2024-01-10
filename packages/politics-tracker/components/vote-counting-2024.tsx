import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;

  iframe {
    width: 100%;
    min-height: 550px;
    ${({ theme }) => theme.breakpoint.xl} {
      min-height: 600px;
    }
  }
`
export default function VoteCounting2024() {
  return (
    <Wrapper>
      <iframe src="https://dev.mirrormedia.mg/projects/dev-election2024-homepage-0110-6/index.html"></iframe>
    </Wrapper>
  )
}
