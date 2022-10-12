import ArrowDown from '~/components/icons/arrow-down'
import ArrowUp from '~/components/icons/arrow-up'
import s from './section-toggle.module.css'

type SectionToggleProps = {
  id: string
  content: string
  isActive: boolean
  setActive: (id: string) => void
}
export default function SectionToggle(props: SectionToggleProps): JSX.Element {
  const toggleClass = props.isActive ? s['toggle-active'] : s['toggle']

  function toggle() {
    if (props.isActive) {
      props.setActive('')
    } else {
      props.setActive(props.id)
    }
  }

  return (
    <div className={s['container']}>
      <div className={toggleClass} onClick={toggle}>
        <div className={s['text']}>{props.content}</div>
        <span className={s['icon']}>
          {props.isActive ? <ArrowUp /> : <ArrowDown />}
        </span>
      </div>
    </div>
  )
}
