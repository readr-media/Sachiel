import React, { Fragment } from 'react'
import styled from 'styled-components'

import { getNewSource } from '~/utils/utils'

import SourceInput from '../politics/source-input'
import AddInputButton from './add-input-button'
import { EditContentItemTitle } from './edit-content-item'

const SourceInputWrapper = styled.div`
  path {
    fill: ${({ theme }) => theme.textColor.blue};
  }
`
export { SourceInputWrapper }

const ErrorMessage = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #c0374f;
  margin: 5px 0px;
`

/**
 *
 * @param {Object} props
 * @param {import('~/types/common').Source[]} props.sourceList
 * @param {function} props.setSourceList
 * @param {Array<Object>} props.inputStatusCheck
 * @returns {React.ReactElement}
 */
export default function EditSource({
  sourceList,
  setSourceList,
  inputStatusCheck,
  // @ts-ignore
  BasicFormEditCheck,
}) {
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

  // check whether content-input has value(if have value, return true)
  // @ts-ignore
  const ContentValueCheck = inputStatusCheck?.some((x) => x.value !== '')

  // check whether source-input has value(if have value, return true)
  const SourceValueCheck = sourceList?.some((x) => x.value !== '')

  // if all inputs are empty, error message hidden
  // if content-input is empty but source-input has, error message also hidden
  // other status: error message show
  function totalValueCheck() {
    if (
      ContentValueCheck === SourceValueCheck ||
      (!ContentValueCheck && SourceValueCheck)
    ) {
      return true
    } else {
      return false
    }
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
        <Fragment key={source.id}>
          <SourceInputWrapper>
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
          {BasicFormEditCheck || totalValueCheck() ? (
            <></>
          ) : (
            <ErrorMessage>請至少填寫一個來源</ErrorMessage>
          )}
        </Fragment>
      ))}
      <AddInputButton
        addTarget="來源"
        onClick={() => addSource()}
      ></AddInputButton>
    </Fragment>
  )
}
