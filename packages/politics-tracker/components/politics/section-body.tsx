import type { Politic } from '~/types/politics'
import classNames from 'classnames'
import AddPoliticBlock from './add-politic-block'
import PoliticBody from './politic-body'
import s from './section-body.module.css'

type SectionBodyProps = { politics: Politic[] } & { show: boolean }

export default function SectionBody(props: SectionBodyProps): JSX.Element {
  const style = classNames(s['section-body'], { [s['show']]: props.show })

  const politicList = props.politics.map((p, i) => (
    <PoliticBody key={p.id} no={i + 1} {...p} />
  ))

  return (
    <div className={style}>
      {props.show && (
        <>
          {props.politics.length > 0 ? (
            politicList
          ) : (
            <div className={s['default']}>這個人還沒有政見...</div>
          )}
          <AddPoliticBlock />
        </>
      )}
    </div>
  )
}
