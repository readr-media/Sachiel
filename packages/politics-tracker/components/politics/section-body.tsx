import classNames from 'classnames'
import { useState } from 'react'

import type { PersonElection, Politic } from '~/types/politics'

import AddPoliticBlock from './add-politic-block'
import PoliticBlock from './politic-block'
import { PoliticListContext } from './react-context/politics-context'
import s from './section-body.module.css'
import WaitingPoliticBlock from './waiting-politic-block'

type SectionBodyProps = Pick<
  PersonElection,
  'source' | 'lastUpdate' | 'politics' | 'waitingPolitics'
> & { show: boolean } & { hidePoliticDetail: string | null }

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
      </div>
    </PoliticListContext.Provider>
  )
}
