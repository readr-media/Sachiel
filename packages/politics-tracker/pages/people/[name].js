import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import theme from '~/styles/theme'

const CustomDiv = styled.div`
  width: 100px;
  height: 100px;
  background-color: black;
  ${({ theme }) => theme.breakpoint.md} {
    background-color: green;
  }
`

/**
 * @returns {React.ReactElement}
 */
export default function People() {
  return (
    <ThemeProvider theme={theme}>
      <CustomDiv />
    </ThemeProvider>
  )
}
