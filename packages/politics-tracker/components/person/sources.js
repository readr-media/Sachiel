import { Fragment, useState } from 'react'
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
/**
 *
 * @param {Object} props
 * @param {import('~/types/common').Source[]} props.sources
 * @returns
 */
export default function Sources({ sources }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Fragment>
      {isOpen && sources && (
        <SourcesContainer>
          <SourcesTitle>來源</SourcesTitle>
          {sources.map((item, index) => (
            <SourceItem
              key={item.value}
              no={index}
              content={item.value}
            ></SourceItem>
          ))}
        </SourcesContainer>
      )}
      <Hr className="hr" />
      <SourcesButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </Fragment>
  )
}
