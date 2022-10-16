import React from 'react'
import styled from 'styled-components'

const ContentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
  justify-content: start;
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

  ${({ theme }) => theme.breakpoint.md} {
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
  }
`
export { ContentItemContainer, ContentItemTitle, ContentItemContent }
/**
 * @param {Object} props
 * @param {String} [props.title]
 * @param {?(String|number)} [props.content]
 * @param {React.ReactElement} [props.children]
 * @returns  {React.ReactElement}
 */
export default function ContentItem({ title = '', content = '', children }) {
  return (
    <ContentItemContainer>
      <ContentItemTitle>{title}</ContentItemTitle>
      {content && (
        <ContentItemContent>
          {children}
          {content}
        </ContentItemContent>
      )}
    </ContentItemContainer>
  )
}
