import { Fragment, useState, useMemo } from 'react'
import styled from 'styled-components'
import SourceItem from '../politics/source-item'
import SourcesButton from './sources-button'
import { stringToSources, sourcesToString, getNewSource } from '~/utils/utils'

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
 * @param {string} [props.sources]
 * @returns
 */
export default function Sources({ sources }) {
  const [isOpen, setIsOpen] = useState(false)
  const sourceList = useMemo(
    () => (sources ? stringToSources(sources, '\n') : []),
    [sources]
  )
  return (
    <Fragment>
      <SourcesContainer>
        {isOpen && (
          <Fragment>
            <SourcesTitle>來源</SourcesTitle>
            {sourceList?.map((item, index) => (
              <SourceItem
                key={item.id}
                no={index + 1}
                content={item.value}
              ></SourceItem>
            ))}
          </Fragment>
        )}
      </SourcesContainer>
      <Hr className="hr" />
      <SourcesButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </Fragment>
  )
}
