import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  padding: 40px 12px;
  background: ${({ theme }) => theme.backgroundColor.black};
  color: ${({ theme }) => theme.backgroundColor.white};
`

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0px auto 20px;

  ${({ theme }) => theme.breakpoint.xl} {
    font-size: 28px;
  }
`

const NameGroup = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  margin: auto;

  p {
    margin-bottom: 4px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 352px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 540px;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;

    p {
      font-size: 18px;
      margin-bottom: 8px;

      & + * {
        margin-left: 24px;
      }
    }
  }
`

export type IntroItem = {
  title: string
  name: string
}

type TeamIntroProps = {
  intro: IntroItem[]
}
export default function TeamIntro({ intro = [] }: TeamIntroProps): JSX.Element {
  return (
    <Wrapper>
      <Title>製作團隊</Title>
      <NameGroup>
        {intro.map((item, index) => (
          <p key={index}>
            {item.title}：{item.name}
          </p>
        ))}
      </NameGroup>
    </Wrapper>
  )
}
