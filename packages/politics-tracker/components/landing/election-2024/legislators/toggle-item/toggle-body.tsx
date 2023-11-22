import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ isActive: boolean }>`
  width: 100%;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  padding: 12px 16px 20px;
  flex-direction: column;
  gap: 32px;
`

type ToggleBodyProps = {
  isActive: boolean
  children: React.ReactNode
}
export default function ToggleBody({
  isActive,
  children,
}: ToggleBodyProps): JSX.Element {
  return <Wrapper isActive={isActive}>{children}</Wrapper>
}
