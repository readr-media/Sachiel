import styled from 'styled-components'

import type { ExtendedOption } from '../../types/common'

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
`
const EmojiWrapper = styled.div`
  margin-left: 0px;
  margin-right: 8px;
  line-height: 1;

  span {
    position: relative;
    &:nth-child(2),
    &:nth-child(3) {
      margin-left: -4px;
    }

    &:nth-child(1) {
      z-index: 3;
    }
    &:nth-child(2) {
      z-index: 2;
    }
    &:nth-child(3) {
      z-index: 1;
    }
  }
`
const Emoji = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #ffffff;
  border-radius: 50%;

  > img {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
  }
`
const Text = styled.p``

type EmojiSummaryProps = {
  emojiMap: Record<string, ExtendedOption>
  summary: Record<string, number>
}

export default function EmojiSummary({ emojiMap, summary }: EmojiSummaryProps) {
  const total = Object.values(summary).reduce((prev, curr) => prev + curr, 0)
  const emojiListData: string[] = Object.entries(summary)
    // reserve amount greater than 0
    .filter((pair) => pair[1] > 0)
    .sort((pairA, pairB) => {
      const [keyA, valA] = pairA
      const [keyB, valB] = pairB
      const orderA = emojiMap[keyA].sortOrder
      const orderB = emojiMap[keyB].sortOrder

      // bigger comes first
      // when equals, higher order comes first
      if (valA < valB) return 1
      else if (valA > valB) return -1
      else return orderA < orderB ? -1 : 1
    })
    .map((pair) => pair[0])
    // max 3 emojis
    .slice(0, 3)

  const emojiList = emojiListData.map((key: string) => {
    const config = emojiMap[key]

    return (
      <Emoji key={key}>
        <img src={config.iconUrl} alt={config.name} />
      </Emoji>
    )
  })

  return (
    <Wrapper>
      {emojiList.length > 0 ? (
        <>
          <EmojiWrapper>{emojiList}</EmojiWrapper>
          <Text>{total}個心情</Text>
        </>
      ) : (
        <Text>還沒有心情</Text>
      )}
    </Wrapper>
  )
}
