import styled from 'styled-components'

import type { PositionChange } from '~/types/politics-detail'

const Wrapper = styled.div`
  padding-top: 20px;
  margin-bottom: 25px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;

  li {
    margin-bottom: 8px;
    padding-left: 15px;
    position: relative;
    cursor: pointer;
  }

  li:before {
    content: '';
    display: inline-block;
    background-color: #f7ba31;
    border-radius: 50%;
    width: 6px;
    height: 6px;
    text-align: center;
    position: absolute;
    left: 0px;
    top: 10px;
  }

  .default-text {
    text-align: center;
    color: rgba(15, 45, 53, 0.3);
    font-size: 18px;
    line-height: 1.8;
  }

  ${({ theme }) => theme.breakpoint.md} {
    li {
      display: flex;
    }
  }
`

const Time = styled.span`
  color: #0f2d35;
  display: block;
  margin-bottom: 4px;

  ${({ theme }) => theme.breakpoint.md} {
    min-width: 100px;
    margin-right: 5px;
  }
`

const Content = styled.div`
  a {
    color: ${({ theme }) => theme.textColor.brown};
    display: inline-block;
    word-break: break-all;

    &:hover {
      text-decoration-line: underline;
      text-underline-offset: 3.5px;
      text-decoration-thickness: 1.5px;
    }

    & + * {
      margin-top: 8px;
    }
  }

  .fact-partner {
    color: rgba(15, 45, 53, 0.5);
    font-size: 14px;
    line-height: 16px;
  }
`

type PositionChangeProps = {
  positions: PositionChange[]
}
export default function PositionChange({
  positions,
}: PositionChangeProps): JSX.Element {
  const positionLists = positions.map((item: PositionChange) => {
    const { id, checkDate, link, content, factcheckPartner } = item

    return (
      <li key={id}>
        <Time>{checkDate?.slice(0, 10)}</Time>
        <Content>
          <a href={link ? link : '/'} target="_blank" rel="noreferrer">
            {content}
          </a>

          {factcheckPartner.name && (
            <p className="fact-partner">查核單位：{factcheckPartner.name}</p>
          )}
        </Content>
      </li>
    )
  })

  return (
    <Wrapper>
      {positions.length > 0 ? (
        <ul>{positionLists}</ul>
      ) : (
        <div className="default-text">還沒有人新增立場變化...</div>
      )}
    </Wrapper>
  )
}
