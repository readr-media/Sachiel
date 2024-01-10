import styled from 'styled-components'
const Wrapper = styled.div`
  position: relative;
  padding: 32px 0;
  background-color: #fff;
  iframe {
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    min-height: 600px;
  }
`
export default function Election2024Homepage() {
  return (
    <Wrapper>
      <iframe src="https://www.readr.tw/project/3/dev-election2024-homepage-0110-7/index.html"></iframe>
    </Wrapper>
  )
}
