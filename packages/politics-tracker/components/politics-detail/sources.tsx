import { Fragment, useMemo } from 'react'
import styled from 'styled-components'

import { stringToSources } from '~/utils/utils'

import SourceItem from '../politics/source-item'

const SourcesContainer = styled.div`
  margin-top: 20px;
  display: flex;
  background-color: ${({ theme }) => theme.backgroundColor.black5};
  position: relative;
  /* TODO:: update style here */
  padding-left: 34px;
  overflow: hidden;
  ${({ theme }) => theme.breakpoint.md} {
    padding-left: 44px;
  }
`
const SourcesTitle = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.black50};
  color: ${({ theme }) => theme.backgroundColor.white};
  font-size: 12px;
  line-height: 14px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  height: 100%;
  width: 34px;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
    line-height: 16px;
    padding: 8px;
    width: 44px;
  }
`
const SourceItemWrap = styled.div`
  align-items: center;
  background-color: rgb(15 45 53 / var(--tw-bg-opacity));
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem 0.3rem 0.5rem 0;

  * {
    border-left-width: 1px;
  }
`

type SourceProps = {
  sources: any
}
export default function Sources({ sources }: SourceProps): JSX.Element {
  const sourceList = useMemo(
    () => (sources ? stringToSources(sources, '\n') : []),
    [sources]
  )
  return (
    <>
      {sourceList.length !== 0 && (
        <Fragment>
          <SourcesContainer>
            <Fragment>
              <SourcesTitle>來源</SourcesTitle>
              <SourceItemWrap>
                {sourceList?.map((item, index) => (
                  <SourceItem
                    key={item.id}
                    no={index + 1}
                    content={item.value}
                  ></SourceItem>
                ))}
              </SourceItemWrap>
            </Fragment>
          </SourcesContainer>
        </Fragment>
      )}
    </>
  )
}
