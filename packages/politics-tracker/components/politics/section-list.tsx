import { useState } from 'react'
import SectionToggle from './section-toggle'
import SectionBody from './section-body'
import s from './section-list.module.css'

export default function SectionList(): JSX.Element {
  const [isActive, setActive] = useState(false)
  const toggleProps = {
    content: '2014 臺北市議員選舉如果這行很長居然有一行以上會這樣排版',
    isActive,
    setActive: () => {
      setActive(() => !isActive)
    },
  }

  return (
    <div className={s['section-list']}>
      <SectionToggle {...toggleProps} />
      <SectionBody show={toggleProps.isActive} />
    </div>
  )
}
