import EditSvg from '../icons/edit'
import styled from 'styled-components'

const EditButtonContainer = styled.button`
  transition: all 300ms ease-in-out;
  display: flex;
  align-items: center;
  user-select: none;
  color: ${({ theme }) => theme.textColor.blue};
  ${({ theme }) => theme.fontSize['main-sub']};
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

export default function EditButton() {
  return (
    <EditButtonContainer>
      <span>編輯</span>
      <EditIcon>
        <EditSvg />
      </EditIcon>
    </EditButtonContainer>
  )
}
