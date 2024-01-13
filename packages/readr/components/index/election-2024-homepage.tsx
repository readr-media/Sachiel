import Image from 'next/image'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ELECTION_2024 } from '~/constants/environment-variables'
const Wrapper = styled.div`
  position: relative;
  padding: 32px 0;
  background-color: #fff;
  iframe {
    background-color: #ebf02c;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
    min-height: 420px;
    ${({ theme }) => theme.breakpoint.xl} {
      min-height: 500px;
    }
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
        {shouldShowIframe ? (
          <iframe src={ELECTION_2024.url}></iframe>
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
      {ELECTION_2024.shouldShowToggleButton && (
        <button
          onClick={() => {
            setShouldShowIframe((pre) => !pre)
          }}
        >
          測試切換
        </button>
      )}
    </>
  )
}
