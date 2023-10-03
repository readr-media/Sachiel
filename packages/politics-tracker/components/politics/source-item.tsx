import { generateSourceMeta } from '~/utils/utils'

import s from './source-item.module.css'

type SourceItemProps = {
  no: number
  content: string
}
export default function SourceItem(props: SourceItemProps): JSX.Element {
  const { isLink, link, text } = generateSourceMeta(
    props.content,
    `來源 ${props.no}：`,
    props.no
  )

  return (
    <>
      {isLink ? (
        <a
          href={link}
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
