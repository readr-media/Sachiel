import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ isActive: boolean }>`
  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor.white};
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  font-weight: 500;
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
