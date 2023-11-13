import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import ArrowDown from '~/public/icons/arrow-down-yellow.svg'
import type { LegislatorAtLarge } from '~/types/politics'

const dotStyle = css`
  width: 6px;
  height: 6px;
  background-color: ${({ theme }) => theme.backgroundColor.landingYellow};
  border-radius: 50%;
  position: absolute;
`

const Wrapper = styled.div`
  margin-bottom: 32px;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

const Title = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  cursor: pointer;
  width: fit-content;
  color: ${({ theme }) => theme.textColor.black};
  margin-bottom: 12px;

  > svg {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};

    path {
      fill: ${({ theme }) => theme.textColor.black30};
    }
  }
`

const LegislatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0px -1px 0px 0px rgba(0, 0, 0, 0.1) inset;
  padding-bottom: 12px;
`

const Group = styled.div`
  color: ${({ theme }) => theme.textColor.black50};

  .subtitle {
    color: ${({ theme }) => theme.textColor.yellow};
    padding: 0px 8px 0px 14px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    margin-right: 8px;
    position: relative;

    &::before {
      ${dotStyle}
      content: '';
      position: absolute;
      left: 0px;
      top: 8px;
    }
  }
`

const List = styled.a`
  color: ${({ theme }) => theme.textColor.black50};
  list-style: none;
  display: inline-block;
  width: fit-content;
  transition: all 0.1s ease-out;

  &:hover {
    color: ${({ theme }) => theme.textColor.black};
  }
`

type LegislatorAtLargeProps = {
  legislators: LegislatorAtLarge[]
  isElectionFinished: boolean
}
export default function LegislatorAtLarge({
  legislators = [],
  isElectionFinished = false,
}: LegislatorAtLargeProps): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(false)

  if (!legislators.length) return null

  const filterLegislators = (isElected: boolean) =>
    legislators.filter((legislator) => legislator.elected === isElected)

  const electedList = filterLegislators(true) || [] //當選名單
  const notElectedList = filterLegislators(false) || [] //未當選名單

  const legislatorLists = isElectionFinished ? (
    <>
      {electedList.length > 0 && (
        <Group>
          <span className="subtitle">當選</span>
          {electedList.map((legislator, index) => (
            <React.Fragment key={index}>
              <List
                href={`/person/${legislator.person_id.id}`}
                target="_blank"
                rel="noreferrer nooppener"
              >
                <li>{legislator.person_id.name}</li>
              </List>
              {index < electedList.length - 1 && <span>、</span>}
            </React.Fragment>
          ))}
        </Group>
      )}

      {notElectedList.length > 0 && (
        <Group>
          <span className="subtitle">未當選</span>
          {notElectedList.map((legislator, index) => (
            <React.Fragment key={index}>
              <List
                href={`/person/${legislator.person_id.id}`}
                target="_blank"
                rel="noreferrer nooppener"
              >
                <li>{legislator.person_id.name}</li>
              </List>
              {index < notElectedList.length - 1 && <span>、</span>}
            </React.Fragment>
          ))}
        </Group>
      )}
    </>
  ) : (
    <Group>
      <span className="subtitle">提名</span>
      {legislators.map((legislator, index) => (
        <React.Fragment key={index}>
          <List
            href={`/person/${legislator.person_id.id}`}
            key={index}
            target="_blank"
            rel="noreferrer nooppener"
          >
            <li>{legislator.person_id.name}</li>
          </List>
          {index < legislators.length - 1 && <span>、</span>}
        </React.Fragment>
      ))}
    </Group>
  )

  return (
    <Wrapper>
      <Title onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
        <span>不分區立委名單</span>
        <ArrowDown />
      </Title>

      {isOpen && <LegislatorContainer>{legislatorLists}</LegislatorContainer>}
    </Wrapper>
  )
}
