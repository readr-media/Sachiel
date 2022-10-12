import { isURL } from '~/utils/utils'
import s from './source-item.module.css'

type SourceItemProps = {
  no: number
  content: string
}
export default function SourceItem(props: SourceItemProps): JSX.Element {
  const isLink = isURL(props.content)
  const text = isLink
    ? `來源 ${props.no}`
    : `來源 ${props.no}：${props.content}`

  return (
    <>
      {isLink ? (
        <a
          href={props.content}
          target="_blank"
          rel="noreferer noopener noreferrer"
          className={s['link']}
        >
          {text}
        </a>
      ) : (
        <span className={s['text']}>{text}</span>
      )}
    </>
  )
}
