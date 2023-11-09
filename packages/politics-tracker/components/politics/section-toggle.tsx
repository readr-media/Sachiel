import styled from 'styled-components'

import Icon from '~/components/icon'
import ArrowDown from '~/components/icons/arrow-down'
import ArrowUp from '~/components/icons/arrow-up'
import ElectionTerm from '~/components/shared/election-term'
import type { PersonElectionTerm } from '~/types/politics'
import { logGAEvent } from '~/utils/analytics'

import s from './section-toggle.module.css'

const PartyTermWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-direction: column;
  ${({ theme }) => theme.breakpoint.md} {
    flex-direction: row;
    width: fit-content;
  }
`

type SectionToggleProps = {
  id: string
  content: string
  party: string
  partyIcon: string
  isActive: boolean
  order: number
  setActive: () => void
  electionTerm: PersonElectionTerm
  elected: boolean
  incumbent: boolean
  isPartyPage: boolean
}
export default function SectionToggle(props: SectionToggleProps): JSX.Element {
  const toggleClass = props.isActive ? s['toggle-active'] : s['toggle']

  function toggle() {
    if (props.isActive) {
      props.setActive()
    } else {
      props.setActive()
    }
  }

  return (
    <div
      className={s['container']}
      onClick={() => {
        if (props.order && !props.isActive) {
          return logGAEvent('click', '點擊展開其他選舉欄')
        }
      }}
    >
      <div className={toggleClass} onClick={toggle}>
        <div className={s['content']}>
          <div className={s['text']}>{props.content}</div>
          {!props.isPartyPage && (
            <PartyTermWrapper>
              <div className={s['party-group']}>
                <Icon
                  src={props.partyIcon}
                  width={20}
                  height={20}
                  borderWidth={1}
                  unoptimized={true}
                />
                <div className={s['party']}>{props.party}</div>
              </div>
              <ElectionTerm
                isElected={props.elected}
                isIncumbent={props.incumbent}
                termDate={props.electionTerm}
              />
            </PartyTermWrapper>
          )}
        </div>
        <span className={s['control']}>
          {props.isActive ? <ArrowUp /> : <ArrowDown />}
        </span>
      </div>
    </div>
  )
}
