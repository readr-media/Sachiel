import React from 'react'
import styled from 'styled-components'

import ArrowTilt from '~/public/icons/landing/tilt-arrow.svg'

const Wrapper = styled.div`
  margin: 20px auto 0px;
  width: 100%;
  padding: 16px;
  text-align: center;
  background: ${({ theme }) => theme.textColor.yellow};
  color: ${({ theme }) => theme.backgroundColor.white};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  max-width: 1120px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
`

const Button = styled.a`
  border: 2px solid ${({ theme }) => theme.borderColor.white};
  padding: 4px 8px 4px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  margin: 8px auto auto;
  max-width: 165px;
  cursor: pointer;

  ${({ theme }) => theme.breakpoint.md} {
    margin: 0;
    max-width: none;
  }
`

type ButtonToPastLandingProps = {
  title: string
  buttonText: string
  buttonLink: string
}
export default function ButtonToPastLanding({
  title = '',
  buttonText = '',
  buttonLink = '/',
}: ButtonToPastLandingProps): JSX.Element {
  return (
    <Wrapper>
      追蹤 {title}，請見
      <Button href={buttonLink} target="_blank" rel="noreferrer noopenner">
        {buttonText}
        <ArrowTilt />
      </Button>
    </Wrapper>
  )
}
