import { Fragment, useState, useMemo } from 'react'
import styled from 'styled-components'
import SourceItem from '../politics/source-item'
import SourcesButton from './sources-button'
import { stringToSources } from '~/utils/utils'

const SourcesContainer = styled.div`
  margin-top: 20px;
  display: flex;
  background-color: ${({ theme }) => theme.backgroundColor.black5};
  position: relative;
  /* TODO:: 目前這個寫法還沒有很好 */
  padding-left: 34px;
  ${({ theme }) => theme.breakpoint.md} {
    padding-left: 44px;
  }
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
    <>
      {sourceList.length !== 0 && (
        <Fragment>
          <SourcesContainer>
            {isOpen && (
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
            )}
          </SourcesContainer>
          <Hr className="hr" />
          <SourcesButton isOpen={isOpen} setIsOpen={setIsOpen} />
        </Fragment>
      )}
    </>
  )
}
