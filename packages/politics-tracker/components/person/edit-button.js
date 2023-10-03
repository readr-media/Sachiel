import React from 'react'
import styled from 'styled-components'

import EditSvg from '../icons/edit'
/**
 * @param {Object} props
 * @param {function} props.onClick
 */
const EditButtonContainer = styled.button`
  transition: all 300ms ease-in-out;
  display: flex;
  align-items: center;
  user-select: none;
  color: ${({ theme }) => theme.textColor.blue};
  ${({ theme }) => theme.fontSize.button};
  ${({ theme }) => theme.breakpoint.md} {
    ${({ theme }) => theme.fontSize['button-md']};
  }
  padding: 2.5px 5px;
  span {
    margin-right: 4px;
  }
  &:hover {
    background: ${({ theme }) => theme.backgroundColor.black5};
  }
`

const EditIcon = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  path {
    fill: ${({ theme }) => theme.textColor.blue};
  }
`
export { EditButtonContainer, EditIcon }

/**
 *
 * @param {Object} props
 * @param {function} props.onClick
 * @returns {React.ReactElement}
 */
export default function EditButton({ onClick }) {
  return (
    <EditButtonContainer onClick={() => onClick()}>
      <span>編輯</span>
      <EditIcon>
        <EditSvg />
      </EditIcon>
    </EditButtonContainer>
  )
}
