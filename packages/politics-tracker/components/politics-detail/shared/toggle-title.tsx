import styled from 'styled-components'

import SecondArrowDown from '~/components/icons/second-arrow-down'
import SecondArrowUp from '~/components/icons/second-arrow-up'

const ToggleContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  box-shadow: inset 0px -2px 0px #000000;
  padding: 9px 4px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.05rem;
  cursor: pointer;
  .arrow {
    border-color: ${({ theme }) => theme.textColor.blue};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    &.up {
      transform: rotate(-135deg);
      margin: 5px 5px 0;
    }
    &.down {
      transform: rotate(45deg);
      margin: 0 5px 5px;
    }
  }
  svg {
    margin-right: 9px;
    color: ${({ theme }) => theme.textColor.brown};
    border-radius: 50%;
  }
  &:hover svg {
    background: rgba(15, 45, 53, 0.05);
  }
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
  }
`

type ToggleTitleProps = {
  title: string
  isActive: boolean
  setActive: () => void
}
export default function ToggleTitle({
  title,
  isActive,
  setActive,
}: ToggleTitleProps): JSX.Element {
  return (
    <ToggleContainer onClick={() => setActive()}>
      {isActive ? <SecondArrowUp /> : <SecondArrowDown />}
      <span>{title}</span>
    </ToggleContainer>
  )
}
