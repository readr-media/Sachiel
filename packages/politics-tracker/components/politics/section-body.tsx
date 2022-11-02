import type { PersonElection } from '~/types/politics'
import classNames from 'classnames'
import AddPoliticBlock from './add-politic-block'
import PoliticBlock from './politic-block'
import s from './section-body.module.css'

type SectionBodyProps = Pick<
  PersonElection,
  'source' | 'lastUpdate' | 'politics'
> & { show: boolean }

export default function SectionBody(props: SectionBodyProps): JSX.Element {
  const style = classNames(s['section-body'], { [s['show']]: props.show })

  return (
    <div className={style}>
      {props.show && (
        <>
          {props.politics.length > 0 ? (
            <PoliticBlock {...props} />
          ) : (
            <div className={s['default']}>這個人還沒有被新增政見...</div>
          )}
          <AddPoliticBlock />
        </>
      )}
    </div>
  )
}
