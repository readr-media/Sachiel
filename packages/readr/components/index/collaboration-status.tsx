// 協作專區統計資訊

import { useState } from 'react'
import styled from 'styled-components'

import IconUnfold from '~/public/icons/unfold.svg'
import * as gtag from '~/utils/gtag'

type StyledProps = {
  $isOpen: boolean
}

const Container = styled.div`
  color: #000928;
  margin-bottom: 14px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 20px;
  }
`

const Content = styled.p`
  font-size: 15px;
  line-height: 1.2;
  text-align: center;
  letter-spacing: 0.025em;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  ${({ theme }) => theme.breakpoint.md} {
    padding-bottom: 28px;
    line-height: 1.5;
    br {
      display: none;
    }
  }

  > strong {
    font-weight: 900;
  }
`

const Count = styled.strong`
  font-size: 24px;
  line-height: 1.3;
`

const Control = styled.button<StyledProps>`
  box-sizing: content-box;
  display: inline-block;
  vertical-align: text-bottom;
  padding-left: 4px;
  // 15 * 0.025 = 0.375
  padding-right: 4.38px;
  user-select: none;
  transition: transform 0.3s;
  ${({ $isOpen }) => $isOpen && `transform: rotate(-180deg);`}
`

const NameList = styled.div`
  font-size: 15px;
  line-height: 1.8;
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`

type CollaborationStatusProps = {
  count: number
  names: string
  loadNames?: () => {}
}

export default function CollaborationStatus({
  count,
  names,
  loadNames,
}: CollaborationStatusProps): JSX.Element {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const date = today.getDate()
  const [shouldShowNameList, setShouldShowNameList] = useState(false)

  function toggleFold() {
    gtag.sendEvent('homepage', 'click', 'collaboration-more')

    if (loadNames) {
      loadNames()
    }

    setShouldShowNameList((state) => !state)
  }

  return (
    <Container>
      <Content>
        截至 <strong>{year}</strong> 年 <strong>{month}</strong> 月
        <strong>{date}</strong> 日<br />
        已有
        <Count>{count}</Count>
        人參與協作，看最新 80 位
        <Control
          onClick={toggleFold}
          $isOpen={shouldShowNameList}
          title="開啟協作者清單"
        >
          <IconUnfold />
        </Control>
        協作者
      </Content>
      {shouldShowNameList && <NameList>{names}</NameList>}
    </Container>
  )
}
