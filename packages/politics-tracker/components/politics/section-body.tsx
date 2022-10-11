import AddPoliticBlock from './add-politic-block'
import s from './section-body.module.css'

type SectionBodyProps = {
  show: boolean
}

export default function SectionBody(props: SectionBodyProps): JSX.Element {
  return (
    <>
      {props.show && (
        <div className={s['section-body']}>
          <AddPoliticBlock />
        </div>
      )}
    </>
  )
}
