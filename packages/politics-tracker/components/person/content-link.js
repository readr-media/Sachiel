import {
  ContentItemContainer,
  ContentItemTitle,
  ContentItemContent,
} from './content-item'
import styled from 'styled-components'

const ContentItemLink = styled(ContentItemContent)`
  color: ${({ theme }) => theme.textColor.blue};
`

export default function ContentLink({ title = '', links = '' }) {
  return (
    <ContentItemContainer>
      <ContentItemTitle>{title}</ContentItemTitle>
      {links && (
        <ContentItemLink
          as="a"
          href={links}
          target="_blank"
          rel="noreferrer noopener"
        >
          {links}
        </ContentItemLink>
      )}
    </ContentItemContainer>
  )
}
