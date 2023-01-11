import styled from 'styled-components'

const Text = styled.h1`
  font-size: 3rem;
  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 6rem;
  }
`

export default function Home() {
  return <Text>This is READr</Text>
}
