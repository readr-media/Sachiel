import type { Politic, PersonElection } from '~/types/politics'
import { SOURCE_DELIMITER } from '~/constants/politics'
import PoliticBody from './politic-body'
import s from './politic-block.module.css'

type PoliticBlockProps = Pick<PersonElection, 'politics'>

type GroupData = {
  name: string
  politics: Politic[]
}

export default function PoliticBlock(props: PoliticBlockProps): JSX.Element {
  const defaultGroupName = 'default'

  const groupMap: Record<string, GroupData> = {}
  props.politics.forEach((p) => {
    const tagName = p.tagName ?? defaultGroupName

    if (!groupMap.hasOwnProperty(tagName)) {
      groupMap[tagName] = {
        name: tagName,
        politics: [],
      }
    }
    groupMap[tagName].politics.push(p)
  })
  const group = Object.values(groupMap)
    .map((g: GroupData) => {
      // sort politics by id in ascending order
      g.politics.sort(
        (p1: Politic, p2: Politic) => Number(p1.id) - Number(p2.id)
      )
      return g
    })
    // sort politics group by amount of politics in desceding order
    .sort(
      (g1: GroupData, g2: GroupData) => g2.politics.length - g1.politics.length
    )

  const politcGroup = group.map((g) => (
    <section key={g.name} className={s['group-member']}>
      {g.name !== defaultGroupName && (
        <span className={s['group-title']}>#{g.name}</span>
      )}
      <div className={s['politic']}>
        {g.politics.map((p, i) => (
          <PoliticBody key={p.id} no={i + 1} {...p} />
        ))}
      </div>
    </section>
  ))

  return (
    <div className={s['container']}>
      <div className={s['group-container']}>{politcGroup}</div>
    </div>
  )
}
