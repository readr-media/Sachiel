import styled from 'styled-components'

import DefaultText from '~/components/politics-detail/default-text'
import type { TimeLine } from '~/types/politics-detail'
import { getFormattedDate } from '~/utils/utils'

const Wrapper = styled.div`
  padding: 20px 0px 40px;
  font-size: 16px;
  line-height: 1.5;
`

const TimeList = styled.li`
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
  }
`

type TimelineProps = {
  timelines: TimeLine[]
}
export default function Timeline({
  timelines = [],
}: TimelineProps): JSX.Element {
  const timeLists = timelines.map((item: TimeLine) => {
    const { id, eventDate, link, content } = item

    return (
      <TimeList key={id}>
        {eventDate && <Time>{getFormattedDate(eventDate)}</Time>}
        <ContentBlock>
          {content && (
            <a
              className="content-text"
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          )}
        </ContentBlock>
      </TimeList>
    )
  })

  return (
    <Wrapper>
      {timelines.length > 0 ? (
        <ul>{timeLists}</ul>
      ) : (
        <DefaultText title="相關進度" />
      )}
    </Wrapper>
  )
}
