import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ isActive: boolean }>`
  transition: all 0.3s ease-in-out;
  width: 100%;
  max-height: ${({ isActive }) => (isActive ? 'unset' : '0px')};
  background-color: ${({ theme }) => theme.backgroundColor.white};
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};

  /* TODO: 可以直接寫 display 就好？ */
  /* *,
  * + * {
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  } */
`

type ToggleBodyProps = {
  isActive: boolean
  children: JSX.Element
}
export default function ToggleBody({
  isActive,
  children,
}: ToggleBodyProps): JSX.Element {
  return <Wrapper isActive={isActive}>{children}</Wrapper>
}
