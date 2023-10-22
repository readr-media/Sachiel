import { useState } from 'react'

import ToggleBody from '~/components/politics-detail/shared/toggle-body'
import ToggleTitle from '~/components/politics-detail/shared/toggle-title'

type ToggleItemProps = {
  order: number // map 的 index number
  title: string
  children: React.ReactNode
  isActive: boolean
  titleChildren?: React.ReactNode
}
export default function ToggleItem(props: ToggleItemProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(props.isActive)

  return (
    <>
      <ToggleTitle
        title={props.title}
        isActive={isActive}
        setActive={() => setIsActive(!isActive)}
      >
        {props.titleChildren}
      </ToggleTitle>
      <ToggleBody isActive={isActive}>{props.children}</ToggleBody>
    </>
  )
}
