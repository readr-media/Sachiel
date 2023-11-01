import styled from 'styled-components'

import type { PositionChange } from '~/types/politics-detail'
import { getIsChangedText } from '~/utils/politics-detail'
import { getFormattedDate } from '~/utils/utils'

const Wrapper = styled.div`
  padding: 20px 0px 40px;
  font-size: 16px;
  line-height: 1.5;
`

const PositionList = styled.li`
  & + * {
    margin-top: 15px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
  }
`

const Subtitle = styled.div`
  display: flex;
  margin-bottom: 6px;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    min-width: 6px;
    height: 6px;
    min-height: 6px;
    background-color: ${({ theme }) => theme.backgroundColor.landingYellow};
    border-radius: 50%;
    margin-top: 10px;
    margin-right: 8px;
  }
`

const Time = styled.div`
  color: ${({ theme }) => theme.textColor.black};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .isChanged {
    color: #544ac9;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    display: block;
    min-width: 100px;
    margin: 0px 14px 0px 0px;

    .isChanged {
      margin-top: 4px;
    }
  }
`

const ContentBlock = styled.div`
  .summary {
    color: ${({ theme }) => theme.textColor.brown};
    display: block;
    word-break: break-all;
    cursor: pointer;

    &:hover {
      text-decoration-line: underline;
      text-underline-offset: 3.5px;
      text-decoration-thickness: 1.5px;
    }
  }

  .content {
    color: #0f2d35;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 14px;
    }
  }

  .fact-partner {
    color: ${({ theme }) => theme.textColor.black50};
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 14px;
    }
  }
`

type PositionChangeProps = {
  positions: PositionChange[]
}
export default function PositionChange({
  positions = [],
}: PositionChangeProps): JSX.Element {
  const positionLists = positions.map((item: PositionChange) => {
    const {
      id,
      checkDate,
      isChanged,
      link,
      content,
      factcheckPartner,
      positionChangeSummary,
    } = item

    return (
      <PositionList key={id}>
        {checkDate && (
          <Subtitle>
            <Time>
              <p>{getFormattedDate(checkDate)}</p>
              <p className="isChanged">{getIsChangedText(isChanged)}</p>
            </Time>
          </Subtitle>
        )}
        <ContentBlock>
          {positionChangeSummary && (
            <a
              className="summary"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {positionChangeSummary}
            </a>
          )}

          {content && <p className="content">{content}</p>}

          {factcheckPartner?.name && (
            <span className="fact-partner">
              查核單位：{factcheckPartner.name}
            </span>
          )}
        </ContentBlock>
      </PositionList>
    )
  })

  return (
    <Wrapper>
      <ul>{positionLists}</ul>
    </Wrapper>
  )
}
