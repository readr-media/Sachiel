import { useState } from 'react'

import ToggleBody from '~/components/politics-detail/shared/toggle-body'
import ToggleTitle from '~/components/politics-detail/shared/toggle-title'

type ToggleItemProps = {
  order: number // map 的 index 數字
  title: string
  children: React.ReactNode | React.ReactNode[]
}
export default function ToggleItem(props: ToggleItemProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(props.order === 0)

  return (
    <>
      <ToggleTitle
        title={props.title}
        isActive={isActive}
        setActive={() => setIsActive(!isActive)}
      />
      <ToggleBody isActive={isActive}>{props.children}</ToggleBody>
    </>
  )
}
