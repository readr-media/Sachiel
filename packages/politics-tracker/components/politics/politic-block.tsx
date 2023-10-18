import { SOURCE_DELIMITER } from '~/constants/politics'
import type { PersonElection, Politic } from '~/types/politics'
import { generateSourceMeta } from '~/utils/utils'

import s from './politic-block.module.css'
import PoliticBody from './politic-body'

type PoliticBlockProps = Pick<
  PersonElection,
  'politics' | 'source' | 'lastUpdate'
> & { hidePoliticDetail: string | null }

type GroupData = {
  name: string
  politics: Politic[]
}

export default function PoliticBlock(props: PoliticBlockProps): JSX.Element {
  const defaultGroupName = 'default'

  const groupMap: Record<string, GroupData> = {}
  props.politics.forEach((p) => {
    const politicCategoryName = p.politicCategoryName ?? defaultGroupName

    if (!groupMap.hasOwnProperty(politicCategoryName)) {
      groupMap[politicCategoryName] = {
        name: politicCategoryName,
        politics: [],
      }
    }
    groupMap[politicCategoryName].politics.push(p)
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
        <span className={s['group-title']}>{g.name}</span>
      )}
      <div className={s['politic']}>
        {g.politics.map((p, i) => (
          <PoliticBody
            key={p.id}
            no={i + 1}
            {...p}
            hidePoliticDetail={props.hidePoliticDetail}
          />
        ))}
      </div>
    </section>
  ))

  const sourceData = props.source ? props.source.split(SOURCE_DELIMITER) : []

  const sourceList = sourceData.map((content, index) => {
    const { isLink, link, text } = generateSourceMeta(content, '', index + 1)

    return isLink ? (
      <a
        key={index}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={s['source-item']}
      >
        {text}
      </a>
    ) : (
      <span key={index} className={s['source-item']}>
        {text}
      </span>
    )
  })

  return (
    <div className={s['container']}>
      <div className={s['info']}>
        <span className={s['last-update']}>{props.lastUpdate} 更新</span>
        <span className={s['source']}>來源：{sourceList}</span>
      </div>
      <div className={s['group-container']}>{politcGroup}</div>
    </div>
  )
}
