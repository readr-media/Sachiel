import React, { Fragment, useState, useMemo } from 'react'
import { stringToSources, getNewSource } from '~/utils/utils'
import { SourceInputWrapper } from './edit-source'
import SourceInput from '../politics/source-input'
import styled from 'styled-components'
import EditSource from './edit-source'
import AddInputButton from './add-input-button'
import EditSendOrCancel from './edit-send-or-cancel'
export const InputWrapperNoLabel = styled(SourceInputWrapper)`
  label {
    display: none;
  }
`

/**
 *
 * @param {Object} props
 * @param {import("~/types/person").Person["tags"]} props.tags
 * @param {function} props.setShouldShowEditMode
 * @returns {React.ReactElement}
 */
export default function EditTags(props) {
  const tags = useMemo(
    () =>
      props.tags.map((item) => {
        return Object.assign({}, { id: item.id, value: item.name, error: '' })
      }),
    [props.tags]
  )
  const [tagList, setTagList] = useState(tags)
  function addSource() {
    const extended = [...tagList, getNewSource()]
    setTagList(extended)
  }

  /**
   *
   * @param {string} id
   * @param {string} value
   */
  function updateSource(id, value) {
    const updated = tagList.map((item) => {
      if (id === item.id) {
        return { ...item, value }
      }
      return item
    })
    setTagList(updated)
  }
  /**
   * @param {string} id
   */
  function deleteSource(id) {
    const remain = tagList.filter((item) => id !== item.id)
    setTagList(remain)
  }
  return (
    <Fragment>
      {tagList?.map((item, index) => (
        //TODO: add error and show error
        <InputWrapperNoLabel key={item.id}>
          <SourceInput
            placeholder={'輸入標籤'}
            id={item.id}
            no={index + 1}
            value={item.value}
            error={item.error}
            showError={false}
            removable={index !== 0}
            onChange={updateSource}
            onDelete={deleteSource}
          />
        </InputWrapperNoLabel>
      ))}
      <AddInputButton addTarget="標籤" onClick={addSource}></AddInputButton>
      <EditSendOrCancel
        onClick={() => props.setShouldShowEditMode(false)}
        submitHandler={() => {}}
      />
    </Fragment>
  )
}
