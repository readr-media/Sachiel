import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.breakpoint.md} {
    display: none;
  }
`
const Button = styled.div`
  background: ${({ theme }) => theme.backgroundColor.white};
  border: 2px solid ${({ theme }) => theme.textColor.black};
  border-radius: 24px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto 5px;
  ${({ theme }) => theme.fontSize['title-sub']};
  h3 {
    color: ${({ theme }) => theme.textColor.black};
    ${({ theme }) => theme.fontSize['title-sub']};
    line-height: 1.5;
  }

  &:hover,
  &:active {
    background: ${({ theme }) => theme.backgroundColor.skinColor};
    cursor: pointer;
  }
`
/**
 *
 * @returns {React.ReactElement}
 */

export default function TitleButton() {
  return (
    <ButtonContainer>
      <a href="#mayor">
        <Button>
          <Image
            alt="frontpageButton"
            src="/icons/landing//button-arrow.svg"
            width="20"
            height="20"
          />
          <h3>縣市長</h3>
        </Button>
      </a>
      <a href="#councilorBlock">
        <Button>
          <Image
            alt="frontpageButton"
            src="/icons/landing/button-arrow.svg"
            width="20"
            height="20"
          />
          <h3>縣市議員</h3>
        </Button>
      </a>
    </ButtonContainer>
  )
}
