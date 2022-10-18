import EditSvg from '../icons/edit'
import styled from 'styled-components'
import React from 'react'
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
  ${({ theme }) =>
    // @ts-ignore: the key here is not existed in config, should be fixed
    theme.fontSize['main-sub']};
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
