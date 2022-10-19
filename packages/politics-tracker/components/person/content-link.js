import {
  ContentItemContainer,
  ContentItemTitle,
  ContentItemContent,
} from './content-item'
import styled from 'styled-components'
import React, { useMemo } from 'react'
import { stringToSources, getNewSource } from '~/utils/utils'

const ContentItemLink = styled(ContentItemContent)`
  color: ${({ theme }) => theme.textColor.blue};
  margin-bottom: 8px;
`
/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {import('~/types/person').Person["links"]} props.links
 * @returns {React.ReactElement}
 */
export default function ContentLink({ title, links }) {
  const linkList = useMemo(
    () => (links ? stringToSources(links, '\n') : []),
    [links]
  )
  return (
    <ContentItemContainer>
      <ContentItemTitle>{title}</ContentItemTitle>
      <div>
        {linkList?.map((item) => (
          <ContentItemLink
            key={item.id}
            as="a"
            href={item.value}
            target="_blank"
            rel="noreferrer noopener"
          >
            {item.value}
          </ContentItemLink>
        ))}
      </div>
    </ContentItemContainer>
  )
}
