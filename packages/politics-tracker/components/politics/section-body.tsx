import classNames from 'classnames'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import ArrowRight from '~/public/icons/landing/arrow-right.svg'
import type { MainCandidate, PersonElection, Politic } from '~/types/politics'

import AddPoliticBlock from './add-politic-block'
import PoliticBlock from './politic-block'
import { PoliticListContext } from './react-context/politics-context'
import s from './section-body.module.css'
import WaitingPoliticBlock from './waiting-politic-block'

type SectionBodyProps = Pick<
  PersonElection,
  'source' | 'lastUpdate' | 'politics' | 'waitingPolitics'
> & { show: boolean } & { hidePoliticDetail: string | null } & {
  mainCandidate: MainCandidate | null
}

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
`

export default function SectionBody(props: SectionBodyProps): JSX.Element {
  const copiedWatingPolitics = props.waitingPolitics
    .slice(0)
    .sort((p1, p2) => Number(p1.id) - Number(p2.id))

  const [waitingPoliticList, setWaitinPoliticList] =
    useState<Politic[]>(copiedWatingPolitics)

  function addToPoliticList(politic: Politic) {
    setWaitinPoliticList([...waitingPoliticList, politic])
  }

  const style = classNames(s['section-body'], { [s['show']]: props.show })

  return (
    <PoliticListContext.Provider
      value={{ politicList: waitingPoliticList, addToList: addToPoliticList }}
    >
      <div className={style}>
        {props.show && (
          <>
            {props.mainCandidate ? (
              <Link href={`/politics/${props.mainCandidate.person_id.id}`}>
                <Button>
                  查看總統、副總統政見
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
