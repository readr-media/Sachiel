import styled from 'styled-components'

import ArrowDown from '~/public/icons/landing/toggle-arrow-down.svg'

const ToggleContainer = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 500;
`

const Title = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  svg {
    margin-left: 4px;
    transform: ${({ isActive }) =>
      isActive ? 'rotate(180deg)' : 'rotate(0deg)'};

    path {
      fill: ${({ theme }) => theme.backgroundColor.purpleDark};
    }
  }
`

const Amount = styled.div<{ count: number; totalAmount: number }>`
  color: ${({ theme, count, totalAmount }) =>
    count === 0
      ? theme.textColor.red
      : totalAmount === count
      ? theme.textColor.blue
      : theme.textColor.black};
`

type ToggleTitleProps = {
  title: string
  count: number
  totalAmount: number
  isActive: boolean
  setActive: () => void
}
export default function ToggleTitle({
  title,
  isActive,
  setActive,
  count = 0,
  totalAmount = 0,
}: ToggleTitleProps): JSX.Element {
  return (
    <ToggleContainer onClick={() => setActive()}>
      <Title isActive={isActive}>
        <span>{title}</span>
        <ArrowDown />
      </Title>
      <Amount count={count} totalAmount={totalAmount}>
        {count}/{totalAmount}
      </Amount>
    </ToggleContainer>
  )
}
