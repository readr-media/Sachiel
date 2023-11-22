import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ titleColor: string }>`
  .subtitle {
    padding: 4px 8px;
    border-radius: 32px;
    background: ${({ theme, titleColor }) => theme.backgroundColor[titleColor]};
    color: ${({ theme }) => theme.textColor.white};
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px;
    white-space: nowrap;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    align-items: flex-start;
    gap: 8px;

    & + * {
      margin-top: 12px;
    }
  }
`

const Group = styled.ul`
  margin-top: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px 32px;
  overflow: hidden;
  padding: 0px 0px 1px;

  ${({ theme }) => theme.breakpoint.xl} {
    margin-top: 0px;
    gap: 8px 16px;
  }
`

const Name = styled.a`
  position: relative;
  color: #544ac9;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 1.3;
  cursor: pointer;

  &:hover {
    text-decoration: underline 1px;
    text-underline-offset: 3.5px;
    transition: all 0.3s ease-in-out;
  }

  & + *::before {
    content: '';
    width: 1px;
    height: 23px;
    background: rgba(15, 45, 53, 0.3);
    position: absolute;
    top: 0px;
    left: -16px;

    ${({ theme }) => theme.breakpoint.xl} {
      left: -8px;
      height: 18px;
      top: 2px;
    }
  }
`

type CandidateListProps = {
  title: '還沒有政見' | '政見還很少' | '超過 20 條政見'
}

export default function CandidateList({
  title,
}: CandidateListProps): JSX.Element {
  let titleColor = ''

  switch (title) {
    case '還沒有政見':
      titleColor = 'highlightRed'
      break

    case '政見還很少':
      titleColor = 'orange'
      break

    case '超過 20 條政見':
      titleColor = 'green'
      break

    default:
      titleColor = 'highlightRed'
  }

  return (
    <Wrapper titleColor={titleColor}>
      <span className="subtitle">{title}</span>
      <Group>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>施奉先</li>
        </Name>
        <Name>
          <li>海綿寶寶</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>施奉先</li>
        </Name>
        <Name>
          <li>海綿寶寶</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>施奉先</li>
        </Name>
        <Name>
          <li>海綿寶寶</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>施奉先</li>
        </Name>
        <Name>
          <li>海綿寶寶</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>施奉先</li>
        </Name>
        <Name>
          <li>海綿寶寶</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
        <Name>
          <li>蔣萬安</li>
        </Name>
      </Group>
    </Wrapper>
  )
}
