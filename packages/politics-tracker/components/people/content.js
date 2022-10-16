import React, { Fragment } from 'react'

import ContentTitle from './content-title'
import EditButton from './edit-button'
import ContentItem from './content-item'
import styled from 'styled-components'
const ContentContainer = styled.div`
  padding: 20px 0;
`
/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactElement[] | React.ReactElement} props.children
 * @returns {React.ReactElement}
 */
export default function Content({ title, children }) {
  return (
    <ContentContainer>
      <ContentTitle title={title}>
        <EditButton />
      </ContentTitle>
      {children}
    </ContentContainer>
  )
}
