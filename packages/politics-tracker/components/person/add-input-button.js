import styled from 'styled-components'
import Plus from '../icons/plus'
import { EditIcon } from './edit-button'
const AddInputButtonWrapper = styled.button`
  color: ${({ theme }) => theme.textColor.blue};
  display: flex;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  padding: 12px 0;

  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(255, 255, 255, 0) 0%
    ),
    linear-gradient(rgba(0, 0, 0, 0.1) 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(to right, rgba(0, 0, 0, 0.1) 50%, rgba(255, 255, 255, 0) 0%),
    linear-gradient(rgba(0, 0, 0, 0.1) 50%, rgba(255, 255, 255, 0) 0%);
  background-position: top, right, bottom, left;
  background-repeat: repeat-x, repeat-y;
  background-size: 10px 1px, 1px 10px;
  &:hover {
    background-image: linear-gradient(
        to right,
        black 50%,
        rgba(255, 255, 255, 0) 0%
      ),
      linear-gradient(black 50%, rgba(255, 255, 255, 0) 0%),
      linear-gradient(to right, black 50%, rgba(255, 255, 255, 0) 0%),
      linear-gradient(black 50%, rgba(255, 255, 255, 0) 0%);
  }
`

/**
 *
 * @param {Object} props
 * @param {string} props.addTarget
 * @param {function} props.onClick
 * @returns {React.ReactElement}
 */

export default function AddInputButton({ addTarget = '來源', onClick }) {
  return (
    <AddInputButtonWrapper onClick={() => onClick()}>
      新增{addTarget}
      <EditIcon>
        <Plus />
      </EditIcon>
    </AddInputButtonWrapper>
  )
}
