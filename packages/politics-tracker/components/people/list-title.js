import React from 'react'
import styled from 'styled-components'

const ListTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    ${({ theme }) => theme.fontSize['title-sub']};
    font-weight: 700;
    padding: 5px 0px;
  }
  border-color: ${({ theme }) => theme.borderColor.black};
  border-style: solid;
  border-width: 0 0 2px;
  padding-bottom: 5px;
`

/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactElement} [props.children]
 * @returns {React.ReactElement}
 */
export default function ListTitle({ title = 'list title', children }) {
  return (
    <ListTitleContainer>
      <h3>{title}</h3>
      {children}
    </ListTitleContainer>
  )
}
