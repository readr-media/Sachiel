// 該元件用來顯示文章的時間與閱讀所需時間資訊

import styled from 'styled-components'

const Container = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 9, 40, 0.66);
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 16px;
  }
`

const ReadTime = styled.p`
  display: inline;
  position: relative;
  padding: 0 0 0 14px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 0 0 0 20px;
  }

  // dot between date and read-time
  &::before {
    content: '';
    position: absolute;
    top: 9px;
    left: 4px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 9, 40, 0.2);
    ${({ theme }) => theme.breakpoint.md} {
      top: 11px;
      left: 8px;
    }
  }
`

type DateAndReadTimeInfoProps = {
  date?: string
  readTimeText?: string
}

export default function DateAndReadTimeInfo({
  date = '',
  readTimeText = '',
}: DateAndReadTimeInfoProps): JSX.Element {
  return (
    <Container className="time">
      {date && <time className="date">{date}</time>}
      {readTimeText && <ReadTime className="read">{readTimeText}</ReadTime>}
    </Container>
  )
}
