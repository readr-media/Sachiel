import Minus from '~/components/icons/minus'

import s from './source-input.module.css'

type SourceInputProps = {
  id: string
  no: number
  value: string
  error: string
  showError: boolean
  removable: boolean
  placeholder?: string
  // this is type definition
  // eslint-disable-next-line
  onChange: (id: string, value: string) => void
  // this is type definition
  // eslint-disable-next-line
  onDelete: (id: string) => void
}

export default function SourceInput(props: SourceInputProps): JSX.Element {
  return (
    <section className={s['container']}>
      <div className={s['input-group']}>
        <label className={s['label']}>
          <span>來源 {props.no}</span>
        </label>
        <input
          className={s['input']}
          placeholder={
            props.placeholder ? props.placeholder : '網址, 選舉公報...'
          }
          value={props.value}
          onChange={(e) => {
            props.onChange(props.id, e.target.value)
          }}
        />
        {props.removable && (
          <span className={s['minus']} onClick={() => props.onDelete(props.id)}>
            <Minus />
          </span>
        )}
      </div>
      {props.error && props.showError && (
        <span className={s['error-text']}>{props.error}</span>
      )}
    </section>
  )
}
