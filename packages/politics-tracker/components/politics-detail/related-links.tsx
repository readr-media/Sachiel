import styled, { css } from 'styled-components'

import { SOURCE_DELIMITER } from '~/constants/politics'
import { generateSourceMeta } from '~/utils/utils'

const dotStyle = css`
  width: 6px;
  height: 6px;
  background-color: ${({ theme }) => theme.backgroundColor.landingYellow};
  border-radius: 50%;
  position: absolute;
`

const ListItem = styled.a`
  position: relative;
  display: block;
  color: ${({ theme }) => theme.textColor.brown};
  word-break: break-all;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 10px;
  padding-left: 15px;

  &:hover {
    text-decoration-line: underline;
    text-underline-offset: 3.5px;
    text-decoration-thickness: 1.5px;
  }

  &::before {
    ${dotStyle}
    content: '';
    position: absolute;
    left: 0px;
    top: 11px;
  }
`

const Title = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.backgroundColor.black50};
  padding: 8px;
  color: ${({ theme }) => theme.textColor.white};
  font-size: 12px;
  margin-bottom: 12px;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 14px;
  }
`

type RelatedLinksProps = {
  links: string
}
export default function RelatedLinks({
  links = '',
}: RelatedLinksProps): JSX.Element | null {
  if (!links) {
    return null
  }

  const items = links
    .split(SOURCE_DELIMITER)
    .map((content: string, index: number) => {
      const { isLink, link, text } = generateSourceMeta(content, '', index + 1)

      return (
        isLink && (
          <ListItem
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </ListItem>
        )
      )
    })

  return (
    <>
      <Title>相關連結</Title>
      <ul>{items}</ul>
    </>
  )
}
