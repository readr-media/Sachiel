import React, { Fragment, useState } from 'react'

import ContentTitle from './content-title'
import EditButton from './edit-button'
import ContentItem from './content-item'
import styled from 'styled-components'
import EditContent from './edit-content'
const ContentContainer = styled.div`
  padding: 0 0 20px;
`
/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactElement[] | React.ReactElement} props.children
 * @param {React.ReactElement[] | React.ReactElement} props.editContent
 * @returns {React.ReactElement}
 */
export default function Content({
  title,

  children,
  editContent,
}) {
  const [shouldShowEditMode, setShouldShowEditMode] = useState(false)

  return (
    <ContentContainer>
      <ContentTitle title={title}>
        <Fragment>
          {!shouldShowEditMode && (
            <EditButton onClick={() => setShouldShowEditMode(true)} />
          )}
        </Fragment>
      </ContentTitle>
      {shouldShowEditMode ? editContent : children}
    </ContentContainer>
  )
}
