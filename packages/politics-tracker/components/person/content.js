import React, { Fragment } from 'react'
import styled from 'styled-components'

import ContentTitle from './content-title'
import EditButton from './edit-button'
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
 * @param {(value: boolean) => void} props.setShouldShowEditMode
 * @param {() => void} props.GAClick
 * @returns {React.ReactElement}
 */
export default function Content({
  title,
  children,
  editContent,
  shouldShowEditMode,
  setShouldShowEditMode,
  GAClick,
}) {
  const submitHandler = () => {
    console.log('submit')
  }
  return (
    <ContentContainer>
      <ContentTitle title={title}>
        <Fragment>
          {!shouldShowEditMode && (
            <EditButton
              onClick={() => {
                GAClick()
                setShouldShowEditMode(true)
              }}
            />
          )}
        </Fragment>
      </ContentTitle>
      {shouldShowEditMode ? <Fragment>{editContent}</Fragment> : children}
    </ContentContainer>
  )
}
