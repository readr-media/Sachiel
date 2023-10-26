import styled from 'styled-components'

import Plus from '../icons/plus'

const AddInputButtonWrapper = styled.button<{ colorType: string }>`
  color: ${({ theme, colorType }) => theme.textColor[colorType]};
  width: 100%;
  margin: 16px auto;
  display: flex;
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

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme, colorType }) => theme.textColor[colorType]};
  }
`

type AddInputButtonProps = {
  addTarget: string
  colorType: 'blue' | 'yellow'
  onClick: () => void
}
export default function AddInputButton({
  addTarget = '來源',
  colorType = 'yellow',
  onClick,
}: AddInputButtonProps): JSX.Element {
  return (
    <AddInputButtonWrapper onClick={() => onClick()} colorType={colorType}>
      新增{addTarget}
      <Plus />
    </AddInputButtonWrapper>
  )
}
