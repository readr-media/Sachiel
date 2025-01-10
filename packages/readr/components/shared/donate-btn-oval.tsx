import NextLink from 'next/link'
import styled from 'styled-components'

import DonateIcon from '~/public/icons/donate-icon.svg'

const DonateLink = styled(NextLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: #212944;
  background-color: #eee500;
  border-radius: 100px;
  height: 32px;
  width: 108px;
  span {
    margin-left: 8px;
  }

  &:hover,
  &:active,
  &:focus {
    background-color: #eee500;
    color: #575d71;
    svg {
      path {
        fill: #575d71;
      }
    }
  }
`

type DonateBtnRectProps = {
  onClick: () => void
  className?: string
}

export default function DonateBtnOval({
  onClick,
  className,
}: DonateBtnRectProps) {
  return (
    <DonateLink
      href="/donate"
      target="_blank"
      rel="external nofollow"
      onClick={onClick}
      className={className}
    >
      <DonateIcon />
      <span>贊助我們</span>
    </DonateLink>
  )
}
