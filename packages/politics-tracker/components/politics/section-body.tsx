import classNames from 'classnames'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import styled from 'styled-components'

import ArrowRight from '~/public/icons/landing/arrow-right.svg'
import type {
  ElectionData,
  ElectionDataForPerson,
  Politic,
} from '~/types/politics'
import { checkIsPartyPage } from '~/utils/politic'

import AddPoliticBlock from './add-politic-block'
import PoliticBlock from './politic-block'
import { PoliticListContext } from './react-context/politics-context'
import { useElectionData } from './react-context/use-politics'
import s from './section-body.module.css'
import WaitingPoliticBlock from './waiting-politic-block'

type SectionBodyProps = Pick<
  ElectionData,
  | 'source'
  | 'lastUpdate'
  | 'politics'
  | 'waitingPolitics'
  | 'electionType'
  | 'year'
> &
  Partial<Pick<ElectionDataForPerson, 'partyId' | 'mainCandidate'>> & {
    show: boolean
  }

const Button = styled.button`
  margin: auto;
  margin-top: 20px;
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
  const copiedWaitingPolitics = props.waitingPolitics
    .slice(0)
    .sort((p1, p2) => Number(p1.id) - Number(p2.id))

  const [waitingPoliticList, setWaitingPoliticList] = useState<Politic[]>(
    copiedWaitingPolitics
  )

  function addToPoliticList(politic: Politic) {
    setWaitingPoliticList([...waitingPoliticList, politic])
  }

  const electionData = useElectionData()
  const style = classNames(s['section-body'], { [s['show']]: props.show })
  const isLegislatorAtLarge = props.electionType === '不分區立委'
  const isVicePresident = !!props.mainCandidate
  const isPartyPage = checkIsPartyPage(electionData)

  const BodyContent: JSX.Element = useMemo(() => {
    switch (true) {
      case !isPartyPage && isLegislatorAtLarge: {
        // 不分區立委
        return (
          <>
            <Link href={`/politics/party/${props.partyId}#${props.year}`}>
              <Button>
                查看政黨政見
                <ArrowRight />
              </Button>
            </Link>
          </>
        )
      }
      case isVicePresident: {
        // 副總統
        return (
          <>
            <Link
              href={`/politics/${props.mainCandidate?.person_id?.id}#${props.year}`}
            >
              <Button>
                查看總統、副總統政見
                <ArrowRight />
              </Button>
            </Link>
          </>
        )
      }
      default: {
        // 候選人、總統、政黨
        return (
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
        )
      }
    }
  }, [
    props,
    isPartyPage,
    isLegislatorAtLarge,
    isVicePresident,
    waitingPoliticList,
  ])

  return (
    <PoliticListContext.Provider
      value={{ politicList: waitingPoliticList, addToList: addToPoliticList }}
    >
      <div className={style}>{props.show && BodyContent}</div>
    </PoliticListContext.Provider>
  )
}
