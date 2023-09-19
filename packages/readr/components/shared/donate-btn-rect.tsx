import NextLink from 'next/link'
import styled from 'styled-components'

const DonateLink = styled(NextLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: #000928;
  background-color: #fff;
  border: 1px solid #000928;
  border-radius: 2px;
  margin-right: 16px;
  height: 40px;
  width: 104px;

  &:hover,
  &:active,
  &:focus {
    background-color: #ebf02c;
  }
`

type DonateBtnRectProps = {
  onClick: () => void
  className?: string
}

export default function DonateBtnRect({
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
      贊助我們
    </DonateLink>
  )
}
