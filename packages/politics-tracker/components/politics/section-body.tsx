import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import ArrowRight from '~/public/icons/landing/arrow-right.svg'
import type { PersonElection, Politic } from '~/types/politics'

import AddPoliticBlock from './add-politic-block'
import PoliticBlock from './politic-block'
import { PoliticListContext } from './react-context/politics-context'
import s from './section-body.module.css'
import WaitingPoliticBlock from './waiting-politic-block'

type SectionBodyProps = Pick<
  PersonElection,
  | 'source'
  | 'lastUpdate'
  | 'politics'
  | 'waitingPolitics'
  | 'organizationId'
  | 'mainCandidate'
  | 'hidePoliticDetail'
  | 'electionType'
> & { show: boolean }

const Button = styled.button`
  margin: auto;
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  width: fit-content;
  border: 2px solid #b2800d;
  color: #b2800d;
  border-radius: 24px;
  padding: 8px 24px 8px 32px;

  font-size: 16px;
  font-weight: 500;
  line-height: 180%; /* 28.8px */

  svg {
    width: 20px;
    height: 20px;
  }

  path {
    fill: #b2800d;
  }

  &:hover {
    background-color: #fffcf3;
  }

  /* Add a conditional styling for disabled buttons */
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    background-color: #ccc;
    border: 2px solid #ccc;
    color: #777;
    &:hover {
    background-color: #ccc;
  }
  `}
`

export default function SectionBody(props: SectionBodyProps): JSX.Element {
  const copiedWaitingPolitics = props.waitingPolitics
    .slice(0)
    .sort((p1, p2) => Number(p1.id) - Number(p2.id))

  const [waitingPoliticList, setWaitingPoliticList] = useState<Politic[]>(
    copiedWaitingPolitics
  )

  function addToPoliticList(politic: Politic) {
    setWaitingPoliticList([...waitingPoliticList, politic])
  }

  const style = classNames(s['section-body'], { [s['show']]: props.show })
  const isLegislatorAtLarge = props.electionType === '不分區立委'
  const isVicePresident = !!props.mainCandidate

  return (
    <PoliticListContext.Provider
      value={{ politicList: waitingPoliticList, addToList: addToPoliticList }}
    >
      <div className={style}>
        {props.show && (
          <>
            {isLegislatorAtLarge || isVicePresident ? (
              <Link
                href={
                  isLegislatorAtLarge
                    ? `/politics/organization/${props.organizationId?.id}`
                    : `/politics/${props.mainCandidate?.person_id.id}`
                }
              >
                <Button disabled={isLegislatorAtLarge}>
                  {isLegislatorAtLarge
                    ? '查看政黨政見'
                    : '查看總統、副總統政見'}
                  <ArrowRight />
                </Button>
              </Link>
            ) : (
              <>
                {props.politics.length > 0 ? (
                  <PoliticBlock {...props} />
                ) : (
                  <div className={s['default']}>這個人還沒有被新增政見...</div>
                )}
                <AddPoliticBlock />
                {waitingPoliticList.length > 0 && (
                  <WaitingPoliticBlock waitingPolitics={waitingPoliticList} />
                )}
              </>
            )}
          </>
        )}
      </div>
    </PoliticListContext.Provider>
  )
}
