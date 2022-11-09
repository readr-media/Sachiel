import styled from 'styled-components'
import Sources from './sources'
import SectionBody from './section-body'

const DetailContainer = styled.div`
  padding: 20px 0px;
  > li:nth-child(1) {
    padding-bottom: 30px;
  }
`
const DetailList = styled.li`
  list-style: none;
  position: relative;
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.8;
    color: #0f2d35;
    text-align: justify;
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
  > span:before {
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
  ${({ theme }) => theme.breakpoint.md} {
    p,
    span {
      font-size: 18px;
    }
  }
`

// @ts-ignore
export default function PoliticsDetail({ politic, additional, isActive }) {
  const source = '選舉公報'

  return (
    <SectionBody shouldShowSectionBody={isActive}>
      <DetailContainer>
        <DetailList>
          <span>政見</span>
          <p>{politic}</p>
        </DetailList>
        <DetailList>
          <span>補充說明</span>
          <p>{additional}</p>
        </DetailList>
        <Sources sources={source} />
      </DetailContainer>
    </SectionBody>
  )
}
