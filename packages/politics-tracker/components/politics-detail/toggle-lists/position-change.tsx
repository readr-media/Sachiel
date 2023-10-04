import styled from 'styled-components'

import DefaultText from '~/components/politics-detail/default-text'
import ChangedIcon from '~/public/icons/position-changed.svg'
import ConsistentIcon from '~/public/icons/position-consistent.svg'
import type { PositionChange } from '~/types/politics-detail'
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

const Time = styled.span`
  color: ${({ theme }) => theme.textColor.black};
  display: inline-block;
  margin-bottom: 8px;

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background-color: ${({ theme }) => theme.backgroundColor.landingYellow};
    border-radius: 50%;
    margin-right: 8px;
    margin-bottom: 3px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    min-width: 100px;
    margin: 0px 14px 0px 0px;
  }
`

const ContentBlock = styled.div`
  .content-text {
    color: ${({ theme }) => theme.textColor.brown};
    display: inline-block;
    word-break: break-all;
    cursor: pointer;

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
    color: ${({ theme }) => theme.textColor.black50};
    font-size: 14px;
    line-height: 16px;
  }
`

const IconBlock = styled.div`
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;

  .changed {
    color: rgba(178, 128, 13, 1);
    margin-left: 5px;
  }

  .consistent {
    color: rgba(131, 131, 131, 1);
    margin-left: 5px;
  }
`

type PositionChangeProps = {
  positions: PositionChange[]
}
export default function PositionChange({
  positions = [],
}: PositionChangeProps): JSX.Element {
  const positionLists = positions.map((item: PositionChange) => {
    const { id, checkDate, link, content, factcheckPartner } = item

    return (
      <PositionList key={id}>
        {checkDate && <Time>{getFormattedDate(checkDate)}</Time>}
        <ContentBlock>
          {content && (
            <a
              className="content-text"
              href={link ? link : '/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          )}

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
      {!!positions.length ? (
        <ul>{positionLists}</ul>
      ) : (
        <DefaultText title="立場變化" />
      )}
    </Wrapper>
  )
}

export function PositionChangeIcon({
  positions = [],
}: PositionChangeProps): JSX.Element {
  const hasChangedPosition = positions.some((item) => item.isChanged !== false)

  return (
    <IconBlock>
      {hasChangedPosition ? (
        <>
          <ChangedIcon />
          <span className="changed"> 立場轉變</span>
        </>
      ) : (
        <>
          <ConsistentIcon />
          <span className="consistent"> 立場一致</span>
        </>
      )}
    </IconBlock>
  )
}
