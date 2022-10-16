import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  h5 {
    color: ${({ theme }) => theme.textColor.black};
    ${({ theme }) => theme.fontSize['title-sub']};
    line-height: 1.5;
  }

  //FIXME: hover顏色效果不太明顯
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
      <Button>
        <Image
          alt="frontpageButton"
          src="/landingpage/button_arrow.svg"
          width="20"
          height="20"
        />
        <h5>縣市長</h5>
      </Button>
      <Button>
        <Image
          alt="frontpageButton"
          src="/landingpage/button_arrow.svg"
          width="20"
          height="20"
        />
        <h5>縣市議員</h5>
      </Button>
    </ButtonContainer>
  )
}
