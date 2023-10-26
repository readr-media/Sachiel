import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.backgroundColor.skinColor};
  box-shadow: inset 0px -4px 0px #000000;
`
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;

  ${({ theme }) => theme.breakpoint.xxl} {
    width: 344px;
  }
`

const Title = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.borderColor.yellow};
  text-align: center;
  padding: 16px 8px 20px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
  box-shadow: 0px -4px 0px 0px #000 inset;
  color: ${({ theme }) => theme.textColor.white};

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
    box-shadow: 0px -4px 0px 0px #000 inset;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  }
`

const Sidebar = styled.div`
  min-width: 40px;
  width: 40px;
  box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  background-color: ${({ theme }) => theme.backgroundColor.highlightRed};

  ${({ theme }) => theme.breakpoint.xl} {
    box-shadow: 0px -4px 0px 0px #000 inset, -4px 0px 0px 0px #000 inset;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    display: none;
  }
`

export default function PresidentComparison(): JSX.Element {
  return (
    <Container>
      <TitleWrapper>
        <Sidebar />
        <Title>總統政見：事實查核</Title>
      </TitleWrapper>
    </Container>
  )
}
