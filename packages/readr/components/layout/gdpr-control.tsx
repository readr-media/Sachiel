import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getLocalStorage, setLocalStorage } from '~/utils/local-storage'

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 100%;
  left: 0;
  bottom: 0;
  font-size: 15px;
  line-height: 1.5;
  letter-spacing: 2.5px;
  border-top-left-radius: 2px;
  border-top-left-radius: 2px;
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.top};

  ${({ theme }) => theme.breakpoint.md} {
    flex-direction: row;
    font-size: 18px;
  }
`

const Message = styled.p`
  order: 2;
  background-color: #0b2163;
  color: #fff;
  padding: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    order: 1;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    padding-left: 60px;
  }
  a {
    text-decoration: underline;
  }
`

const Control = styled.button`
  order: 1;
  background-color: #eee500;
  color: #0b2163;
  padding-top: 11px;
  padding-bottom: 11px;
  letter-spacing: 2.5px;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${({ theme }) => theme.breakpoint.md} {
    order: 2;
    flex: 0 0 170px;
    padding-top: 32px;
    padding-bottom: 32px;
  }
  p {
    // to offset letter-spacing at the rightmost
    margin-left: 2.5px;
  }
`

export default function GDPRControl(): JSX.Element {
  const LOCAL_STORAGE_KEY = 'shouldShowGDPRControl'
  // should be false at first to prevent flashing
  const [shouldShowGDPRControl, setShouldShowGDPControl] = useState(false)

  useEffect(() => {
    setShouldShowGDPControl(getLocalStorage(LOCAL_STORAGE_KEY, true))
  }, [])

  function closeGDPRControl(): void {
    setShouldShowGDPControl(false)
    setLocalStorage(LOCAL_STORAGE_KEY, false)
  }

  if (shouldShowGDPRControl) {
    return (
      <Container>
        <Message>
          本網站使用 cookie
          以及相關技術分析來改善使用者體驗。點選「我知道了」，視窗會關閉。
          <NextLink href="/privacy-rule" target="_blank" rel="noreferrer">
            了解更多
          </NextLink>
        </Message>
        <Control type="button" onClick={closeGDPRControl}>
          <p>我知道了</p>
        </Control>
      </Container>
    )
  } else {
    return <></>
  }
}
