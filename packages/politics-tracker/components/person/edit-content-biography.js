import React, { useState } from 'react'
import { stringToSources, getNewSource } from '~/utils/utils'
import { SourceInputWrapper } from './edit-content-basic'
import SourceInput from '../politics/source-input'
import styled from 'styled-components'

const InputWrapperNoLabel = styled(SourceInputWrapper)`
  label {
    display: none;
  }
`
/**
 *
 * @param {Object} props
 * @param {string} props.listData
 * @returns {React.ReactElement}
 */
export default function EditContentBiography({ listData }) {
  const [list, setList] = useState(stringToSources(listData, '\n'))

  function addSource() {
    const extended = [...list, getNewSource()]
    setList(extended)
  }

  /**
   *
   * @param {string} id
   * @param {string} value
   */
  function updateSource(id, value) {
    const updated = list.map((item) => {
      if (id === item.id) {
        return { ...item, value }
      }
      return item
    })
    setList(updated)
  }
  /**
   * @param {string} id
   */
  function deleteSource(id) {
    const remain = list.filter((item) => id !== item.id)
    setList(remain)
  }
  return (
    <div>
      {list.map((item, index) => (
        //TODO: add error and show error
        <InputWrapperNoLabel key={item.id}>
          <SourceInput
            placeholder={'經歷'}
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
    </div>
  )
}
