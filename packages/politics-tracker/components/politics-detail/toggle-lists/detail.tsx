import styled from 'styled-components'

import Sources from '~/components/politics-detail/sources'
import { SOURCE_DELIMITER } from '~/constants/politics'

const DetailContainer = styled.div`
  padding: 20px 0px;

  > li:nth-child(2) {
    padding-top: 30px;
  }
`
const DetailList = styled.li`
  list-style: none;
  position: relative;
  word-break: break-word;

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.8;
    color: #0f2d35;
    margin-bottom: 12px;
  }
  > span {
    display: inline-block;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 1.3;
    color: #0f2d35;
    margin-bottom: 10px;
    padding-left: 15px;
  }
  &:before {
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
  &:nth-child(2):before {
    top: 40px;
  }
  ${({ theme }) => theme.breakpoint.md} {
    p,
    span {
      font-size: 18px;
    }
  }
`

type DetailsProps = {
  desc: string
  additional: string
  source: string
}
export default function Details({
  desc = '',
  additional = '',
  source = '',
}: DetailsProps): JSX.Element {
  return (
    <DetailContainer>
      <DetailList>
        <span>政見</span>
        {desc.split(SOURCE_DELIMITER).map((item) => {
          return <p key={item}>{item}</p>
        })}
      </DetailList>

      {additional !== '' && (
        <DetailList>
          <span>補充說明</span>
          {additional.split(SOURCE_DELIMITER).map((item) => {
            return <p key={item}>{item}</p>
          })}
        </DetailList>
      )}
      <Sources sources={source} />
    </DetailContainer>
  )
}
