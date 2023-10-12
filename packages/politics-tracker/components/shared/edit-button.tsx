import React from 'react'
import styled from 'styled-components'

import EditIcon from '~/public/icons/edit.svg'

const EditButtonContainer = styled.button<{
  onClick: () => void
  colorType: string
}>`
  transition: all 300ms ease-in-out;
  display: flex;
  align-items: center;
  user-select: none;
  padding: 0px 6px;
  color: ${({ theme, colorType }) => theme.textColor[colorType]};
  font-weight: 500;
  ${({ theme }) => theme.fontSize.button};

  &:hover {
    background: ${({ theme }) => theme.backgroundColor.black5};
  }

  span {
    margin-right: 4px;
  }

  svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${({ theme, colorType }) => theme.textColor[colorType]};
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    ${({ theme }) => theme.fontSize['button-md']};
  }
`

export { EditButtonContainer }

type EditButtonProps = {
  // eslint-disable-next-line
  onClick: (value: boolean) => void
  colorType: 'blue' | 'yellow'
  editMode: boolean
}
export default function EditButton({
  onClick,
  colorType = 'blue',
  editMode = false,
}: EditButtonProps): JSX.Element {
  return (
    <>
      {!editMode && (
        <EditButtonContainer
          //@ts-ignore
          onClick={(e) => {
            e.stopPropagation()
            onClick(true)
          }}
          colorType={colorType}
        >
          <span>編輯</span>
          <EditIcon />
        </EditButtonContainer>
      )}
    </>
  )
}
