import classNames from 'classnames'
import s from './button.module.css'

type ButtonProps = {
  disable?: boolean
  loading?: boolean
  text: string
  icon: JSX.Element
  onClick: () => void
}

export default function Button(props: ButtonProps): JSX.Element {
  const amountOfDots = 3
  const animationDelayStep = 250
  const dots = []
  for (let i = 0; i < amountOfDots; i++) {
    dots.push(
      <span
        key={i}
        className={s['dot']}
        style={{ animationDelay: `${animationDelayStep * i}ms` }}
      />
    )
  }

  const style = classNames(s['button'], {
    [s['disable']]: props.disable,
    [s['loading']]: props.loading,
  })

  return (
    <span className={style} onClick={props.onClick}>
      <span className={s['dots-container']}>{dots}</span>
      <span className={s['content']}>
        <span className={s['text']}>{props.text}</span>
        <span className={s['icon']}>{props.icon}</span>
      </span>
    </span>
  )
}
