import ArrowDown from '../icons/arrow-down'
import ArrowUp from '../icons/arrow-up'
import s from './section-toggle.module.css'

type SectionToggleProps = {
  content: string
  isActive: boolean
  setActive: () => void
}
export default function SectionToggle(props: SectionToggleProps): JSX.Element {
  const toggleClass = props.isActive ? s['toggle-active'] : s['toggle']
  return (
    <div className={s['container']}>
      <div className={toggleClass} onClick={props.setActive}>
        <div className={s['text']}>{props.content}</div>
        <span className={s['icon']}>
          {props.isActive ? <ArrowUp /> : <ArrowDown />}
        </span>
      </div>
    </div>
  )
}
