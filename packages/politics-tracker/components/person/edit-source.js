import React, { Fragment, useState } from 'react'
import SourceInput from '../politics/source-input'
import { EditContentItemTitle } from './edit-content-item'
import AddInputButton from './add-input-button'
import { stringToSources, sourcesToString, getNewSource } from '~/utils/utils'
import styled from 'styled-components'

const SourceInputWrapper = styled.div`
  path {
    fill: ${({ theme }) => theme.textColor.blue};
  }
`
export { SourceInputWrapper }

/**
 *
 * @param {Object} props
 * @param {string} [props.sources]
 * @returns {React.ReactElement}
 */
export default function EditSource({ sources }) {
  const [sourceList, setSourceList] = useState(
    sources ? stringToSources(sources, '\n') : [getNewSource()]
  )

  function addSource() {
    const extended = [...sourceList, getNewSource()]
    setSourceList(extended)
  }

  /**
   *
   * @param {string} id
   * @param {string} value
   */
  function updateSource(id, value) {
    const updated = sourceList.map((source) => {
      if (id === source.id) {
        return { ...source, value }
      }
      return source
    })
    setSourceList(updated)
  }
  /**
   * @param {string} id
   */
  function deleteSource(id) {
    const remain = sourceList.filter((source) => id !== source.id)
    setSourceList(remain)
  }

  return (
    <Fragment>
      <EditContentItemTitle>
        來源 <span className="required">（必填）</span>
      </EditContentItemTitle>
      {sourceList.map((source, index) => (
        //TODO: add error and show error
        <SourceInputWrapper key={source.id}>
          <SourceInput
            id={source.id}
            no={index + 1}
            value={source.value}
            error={source.error}
            showError={false}
            removable={index !== 0}
            onChange={updateSource}
            onDelete={deleteSource}
          />
        </SourceInputWrapper>
      ))}
      <AddInputButton
        addTarget="來源"
        onClick={() => addSource()}
      ></AddInputButton>
    </Fragment>
  )
}
