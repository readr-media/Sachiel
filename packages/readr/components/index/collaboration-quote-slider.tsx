// 協作專區的引言 Slider

import { useEffect, useState } from 'react'
import styled from 'styled-components'

import type { Quote } from '~/graphql/query/quote'

type StyledProps = {
  $shouldShow: boolean
}

const Container = styled.div`
  background-color: #ebe3ff;
  color: #000928;
  line-height: 1.5;
  text-align: center;
  padding: 32px 10px 28px 10px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 48px 98px 32px 98px;
  }

  ul {
    position: relative;
  }
`

const Item = styled.li<StyledProps>`
  position: absolute;
  width: 0%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: none;

  ${({ $shouldShow }) =>
    $shouldShow &&
    `
      position: relative;
      width: 100%;
      opacity: 1;
      transition: opacity 1.5s;
    `}

  > p {
    display: flex;
    justify-content: center;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 2.8px;
    // to offset letter-spacing at the rightmost
    margin-left: 2.8px;
    // 108 = 24 * 1.5 * 3
    height: 108px;
    overflow-x: hidden;
    overflow-y: auto;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 36px;
      letter-spacing: 0.15em;
      // to offset letter-spacing at the rightmost
      margin-left: 0.15em;
    }
  }
`

const Quoter = styled.div`
  font-size: 15px;
  font-weight: 700;
  margin-top: 22px;
  letter-spacing: 2.5px;
  // to offset letter-spacing at the rightmost
  margin-left: 2.5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
    margin-top: 25px;
  }
`

type CollaborationQuoteSliderProps = {
  quotes?: Quote[]
}

export default function CollaborationQuoteSlider({
  quotes = [],
}: CollaborationQuoteSliderProps): JSX.Element {
  const quoteIds = quotes.map((quote) => quote.id)
  const [activeIndex, setActiveIndex] = useState(0)

  function rotateSlide() {
    let nextIndex = activeIndex >= quoteIds.length - 1 ? 0 : activeIndex + 1

    setActiveIndex(nextIndex)
  }

  useEffect(() => {
    const interval = 3500
    let timer: number | undefined

    if (quoteIds.length > 0) {
      timer = window.setInterval(rotateSlide, interval)
    }

    return () => {
      if (timer) {
        window.clearInterval(timer)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  function getQuoter(quote: Quote) {
    return `by ${quote.byline || '匿名讀者'}`
  }

  const quoteItems = quotes.map((quote) => (
    <Item key={quote.id} $shouldShow={quote.id === quoteIds[activeIndex]}>
      <p>{quote.title}</p>
      <Quoter>{getQuoter(quote)}</Quoter>
    </Item>
  ))

  return (
    <Container>
      <ul>{quoteItems}</ul>
    </Container>
  )
}
