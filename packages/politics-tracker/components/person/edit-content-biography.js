import React, { Fragment, useState } from 'react'
import { stringToSources, getNewSource } from '~/utils/utils'
import { SourceInputWrapper } from './edit-source'
import SourceInput from '../politics/source-input'
import styled from 'styled-components'
import EditSource from './edit-source'
export const InputWrapperNoLabel = styled(SourceInputWrapper)`
  label {
    display: none;
  }
`

/**
 *
 * @param {Object} props
 * @param {string} props.listData
 * @param {string} props.sources
 * @returns {React.ReactElement}
 */
export default function EditContentBiography({ listData, sources }) {
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
    <Fragment>
      {list?.map((item, index) => (
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
      <EditSource sources={sources} />
    </Fragment>
  )
}
