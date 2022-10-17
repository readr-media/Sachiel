import React from 'react'
import styled from 'styled-components'

const ContentTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    ${({ theme }) => theme.fontSize['title-sub']};
    font-weight: 700;
    padding: 5px 0px;
    ${({ theme }) => theme.breakpoint.md} {
      ${({ theme }) => theme.fontSize['title-sub-md']};
    }
  }
  border-color: ${({ theme }) => theme.borderColor.black};
  border-style: solid;
  border-width: 0 0 2px;
  padding-bottom: 5px;
  margin-bottom: 20px;
`

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactElement} [props.children]
 * @returns {React.ReactElement}
 */
export default function ContentTitle({ title = 'list title', children }) {
  return (
    <ContentTitleContainer>
      <h3>{title}</h3>
      {children}
    </ContentTitleContainer>
  )
}
