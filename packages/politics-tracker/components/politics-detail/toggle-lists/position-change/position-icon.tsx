import styled from 'styled-components'

import ChangedIcon from '~/public/icons/position-changed.svg'
import ConsistentIcon from '~/public/icons/position-consistent.svg'
import type { PositionChange } from '~/types/politics-detail'

const IconBlock = styled.div`
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;

  .changed {
    color: rgba(178, 128, 13, 1);
    margin-left: 5px;
  }

  .consistent {
    color: rgba(131, 131, 131, 1);
    margin-left: 5px;
  }
`

type PositionIconProps = {
  positions: PositionChange[]
}
export default function PositionChangeIcon({
  positions = [],
}: PositionIconProps): JSX.Element {
  const hasChangedPosition = positions.some((item) => item.isChanged !== false)

  return (
    <IconBlock>
      {hasChangedPosition ? (
        <>
          <ChangedIcon />
          <span className="changed"> 立場轉變</span>
        </>
      ) : (
        <>
          <ConsistentIcon />
          <span className="consistent"> 立場一致</span>
        </>
      )}
    </IconBlock>
  )
}
