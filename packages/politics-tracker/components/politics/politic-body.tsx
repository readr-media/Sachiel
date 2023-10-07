import classNames from 'classnames'
import Link from 'next/link'

import { PROGRESS } from '~/types/common'
import type { Politic } from '~/types/politics'
import { logGAEvent } from '~/utils/analytics'

import ArrowRight from '../icons/arrow-right'
import s from './politic-body.module.css'
import PoliticContent from './politic-content'
import FactCheckAbstract from './politic-fact-check'
import { usePersonElection } from './react-context/use-politics'

type PoliticBodyProps = Politic & { no: number }

export default function PoliticBody(props: PoliticBodyProps): JSX.Element {
  const index = `${String(props.no).padStart(2, '0')}.`
  // const sources = props.source.split(SOURCE_DELIMITER)
  // const sourceList = sources.map((s, i) => (
  //   <SourceItem key={i} no={i + 1} content={s} />
  // ))

  const personElection = usePersonElection()

  const status = personElection.elected
    ? props.progress ?? PROGRESS.NOT_START
    : 'failed'
  const statusStyle = classNames(s['status'], s[status])

  function getStatusText(status: `${PROGRESS}` | 'failed') {
    const map: Record<PROGRESS | 'failed', string> = {
      'no-progress': '未開始',
      'in-progress': '進行中',
      'in-trouble': '卡關中',
      complete: '已完成',
      failed: '未當選',
    }

    return map[status]
  }

  return (
    <div className={s['container']}>
      <div className={s['header']}>
        <span className={s['index']}>{index}</span>
        {personElection.isFinished && (
          <span className={s['politic-status']}>
            <span className={s['text']}>達成進度</span>
            <span className={statusStyle}>{getStatusText(status)}</span>
          </span>
        )}
      </div>
      <div className={s['content-group']}>
        <div className={s['content']}>
          <PoliticContent>{props.desc}</PoliticContent>
        </div>
        <FactCheckAbstract
          positionChange={props.positionChange}
          factCheck={props.factCheck}
          expertPoint={props.expertPoint}
        />
        {/* <div className={s['source-group']}>
          <div className={s['source-label']}>
            <span>來源</span>
          </div>
          <div className={s['source-list']}>{sourceList}</div>
        </div> */}
        <div className={s['control-group']}>
          <Link
            href={{
              pathname: '/politics/detail/[politicId]',
              query: {
                politicId: props.id,
              },
            }}
            legacyBehavior={false}
            className={s['button']}
            onClick={() => logGAEvent('click', '點擊「政見細節」')}
          >
            <span>政見細節</span>
            <span className={s['button-icon']}>
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
