import ArrowDown from '~/components/icons/arrow-down'
import ArrowUp from '~/components/icons/arrow-up'
import Icon from '~/components/icon'
import s from './section-toggle.module.css'

type SectionToggleProps = {
  id: string
  content: string
  party: string
  partyIcon: string
  isActive: boolean
  setActive: () => void
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
    <div className={s['container']}>
      <div className={toggleClass} onClick={toggle}>
        <div className={s['content']}>
          <div className={s['text']}>{props.content}</div>
          <div className={s['party-group']}>
            <Icon
              src={props.partyIcon}
              width={20}
              height={20}
              borderWidth={1}
            />
            <div className={s['party']}>{props.party}</div>
          </div>
        </div>
        <span className={s['control']}>
          {props.isActive ? <ArrowUp /> : <ArrowDown />}
        </span>
      </div>
    </div>
  )
}
