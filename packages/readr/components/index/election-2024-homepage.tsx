import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
const Wrapper = styled.div`
  position: relative;
  padding: 32px 0;
  background-color: #fff;
  iframe {
    background-color: #ebf02c;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    min-height: 600px;
  }
`
export default function Election2024Homepage() {
  const [shouldShowIframe, setShouldShowIframe] = useState(false)
  useEffect(() => {
    const currentTimeStamp = new Date().getTime()
    const targetTimestamp = new Date('2024-01-13T08:00:00Z').getTime()
    if (currentTimeStamp >= targetTimestamp) {
      setShouldShowIframe(true)
    }
  }, [])
  return (
    <>
      <Wrapper>
        {/* <iframe src="http://localhost:3001"></iframe> */}
        {shouldShowIframe ? (
          <iframe src="https://www.readr.tw/project/3/dev-election2024-homepage-0110-9/index.html"></iframe>
        ) : (
          <Image
            style={{ margin: '0 auto' }}
            height={250}
            width={970}
            src="/election2024_readr_970x250.jpg"
            alt="2024年總統大選將於2024/1/13 16:00開始開票"
            priority={true}
          ></Image>
        )}
      </Wrapper>
      <button
        onClick={() => {
          setShouldShowIframe((pre) => !pre)
        }}
      >
        測試切換
      </button>
    </>
  )
}
