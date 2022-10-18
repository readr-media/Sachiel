import { Fragment } from 'react'
import styled from 'styled-components'
import SourceItem from '../politics/source-item'
import SourcesButton from './sources-button'
const SourcesContainer = styled.div`
  margin-top: 20px;
  display: flex;
  background-color: ${({ theme }) => theme.backgroundColor.black5};
  align-items: center;
`

const Hr = styled.hr`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 8px;
`
const SourcesTitle = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.black50};
  color: ${({ theme }) => theme.backgroundColor.white};
  font-size: 12px;
  line-height: 14px;
  padding: 8px;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
    line-height: 16px;
  } ;
`

export default function Sources() {
  return (
    <Fragment>
      <SourcesContainer>
        <SourcesTitle>來源</SourcesTitle>
        <SourceItem no={1} content={'資料'}></SourceItem>
        <SourceItem no={2} content={'資料2'}></SourceItem>
      </SourcesContainer>
      <Hr className="hr" />
      <SourcesButton />
    </Fragment>
  )
}
