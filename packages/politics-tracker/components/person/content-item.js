import React, { useMemo } from 'react'
import styled from 'styled-components'
import { stringToSources, getNewSource } from '~/utils/utils'

const ContentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  justify-content: start;
  align-items: start;
  min-height: 40px;
  ${({ theme }) => theme.fontSize['title-sub']};
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 8px;
    flex-direction: row;
    ${({ theme }) => theme.fontSize['title-sub-md']};
  }
`
const ContentItemTitle = styled.div`
  font-weight: 700;
  ${({ theme }) => theme.fontSize['title-sub']};

  ${({ theme }) => theme.breakpoint.md} {
    ${({ theme }) => theme.fontSize['title-sub-md']};
    display: flex;
    justify-content: start;
    align-items: center;
    min-width: 92px;
    margin-right: 40px;
  }
`
const ContentItemContent = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: 500;
  margin-top: 8px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 0;
    margin-bottom: 8px;
  }
`
export { ContentItemContainer, ContentItemTitle, ContentItemContent }
/**
 * @param {Object} props
 * @param {String} [props.title]
 * @param {String} props.content
 * @param {React.ReactElement} [props.children]
 * @returns  {React.ReactElement}
 */
export default function ContentItem({ title = '', content, children }) {
  const contentList = useMemo(
    () => (content ? stringToSources(content, '\n') : []),
    [content]
  )
  return (
    <ContentItemContainer>
      <ContentItemTitle>{title}</ContentItemTitle>
      <div>
        {contentList?.map((item) => (
          <ContentItemContent key={item.id}>
            {children}
            {item.value}{' '}
          </ContentItemContent>
        ))}
      </div>
    </ContentItemContainer>
  )
}
