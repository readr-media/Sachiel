import React, { Fragment, useState } from 'react'

import ContentTitle from './content-title'
import EditButton from './edit-button'
import ContentItem from './content-item'
import styled from 'styled-components'
import EditSendOrCancel from './edit-send-or-cancel'
const ContentContainer = styled.div`
  padding: 0 0 20px;
`
/**
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactElement[] | React.ReactElement} props.children
 * @param {React.ReactElement[] | React.ReactElement} [props.editContent]
 * @param {boolean} props.shouldShowEditMode
 * @param {function} props.setShouldShowEditMode
 * @returns {React.ReactElement}
 */
export default function Content({
  title,
  children,
  editContent,
  shouldShowEditMode,
  setShouldShowEditMode,
}) {
  const submitHandler = () => {
    console.log('submit')
  }
  return (
    <ContentContainer>
      <ContentTitle title={title}>
        <Fragment>
          {!shouldShowEditMode && (
            <EditButton onClick={() => setShouldShowEditMode(true)} />
          )}
        </Fragment>
      </ContentTitle>
      {shouldShowEditMode ? <Fragment>{editContent}</Fragment> : children}
    </ContentContainer>
  )
}
