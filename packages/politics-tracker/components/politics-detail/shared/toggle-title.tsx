import styled from 'styled-components'

import SecondArrowDown from '~/components/icons/second-arrow-down'
import SecondArrowUp from '~/components/icons/second-arrow-up'

const ToggleContainer = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 1.3;
  letter-spacing: 0.05rem;
  cursor: pointer;

  margin: auto;
  padding: 9px 0px 9px 4px;
  box-shadow: inset 0px -2px 0px #000000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;

  &:hover svg {
    background: ${({ theme }) => theme.backgroundColor.black5};
  }

  svg {
    margin-right: 9px;
    color: ${({ theme }) => theme.textColor.brown};
    border-radius: 50%;
  }
`

type ToggleTitleProps = {
  title: string
  isActive: boolean
  setActive: () => void
  children?: React.ReactNode
}
export default function ToggleTitle({
  title,
  isActive,
  setActive,
  children,
}: ToggleTitleProps): JSX.Element {
  return (
    <ToggleContainer onClick={() => setActive()}>
      <Title>
        {isActive ? <SecondArrowUp /> : <SecondArrowDown />}
        <span>{title}</span>
      </Title>
      {children}
    </ToggleContainer>
  )
}
