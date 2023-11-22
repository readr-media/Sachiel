import { useState } from 'react'
import styled from 'styled-components'

import ToggleBody from '~/components/landing/election-2024/legislators/toggle-item/toggle-body'
import ToggleTitle from '~/components/landing/election-2024/legislators/toggle-item/toggle-title'

const Wrapper = styled.div`
  display: block;

  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`

type ToggleItemProps = {
  order: number // map 的 index number
  title: string
  children: React.ReactNode
  count: number
  totalAmount: number
}
export default function ToggleItem(props: ToggleItemProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <Wrapper className="toggle-item">
      <ToggleTitle
        title={props.title}
        isActive={isActive}
        setActive={() => setIsActive(!isActive)}
        totalAmount={props.totalAmount}
        count={props.count}
      />
      <ToggleBody isActive={isActive}>{props.children}</ToggleBody>
    </Wrapper>
  )
}
