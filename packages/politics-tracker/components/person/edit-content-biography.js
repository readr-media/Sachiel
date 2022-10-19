import React, { Fragment, useState } from 'react'
import { stringToSources, sourcesToString, getNewSource } from '~/utils/utils'
import { SourceInputWrapper } from './edit-source'
import SourceInput from '../politics/source-input'
import styled from 'styled-components'
import EditSource from './edit-source'
import AddInputButton from './add-input-button'
import EditSendOrCancel from './edit-send-or-cancel'
import { print } from 'graphql'
import CreatePerson from '~/graphql/mutation/person/create-person.graphql'
import { fireGqlRequest } from '~/utils/utils'

export const InputWrapperNoLabel = styled(SourceInputWrapper)`
  label {
    display: none;
  }
`

/**
 *
 * @param {Object} props
 * @param {string} [props.listData]
 * @param {string} [props.sources]
 * @param {function} props.setShouldShowEditMode
 * @param {import('~/types/person').Person["id"]} props.personId
 * @param {import('~/types/person').Person["name"]} props.personName
 * @param {function} props.personName
 * @returns {React.ReactElement}
 */
export default function EditContentBiography({
  listData,
  sources,
  setShouldShowEditMode,
  personId,
  personName,
}) {
  const [list, setList] = useState(
    listData ? stringToSources(listData, '\n') : [getNewSource()]
  )
  const [sourceList, setSourceList] = useState(
    sources ? stringToSources(sources, '\n') : [getNewSource()]
  )

  //client side only
  //TODO: use type Person in person.ts rather than {Object}
  /** @param {Object} data */
  async function createPerson(data) {
    const cmsApiUrl = `${window.location.origin}/api/data`

    try {
      const variables = {
        data: {
          thread_parent: {
            connect: { id: personId },
          },
          ...data,
        },
      }
      const result = await fireGqlRequest(
        print(CreatePerson),
        variables,
        cmsApiUrl
      )
      console.log(result)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }
  async function submitHandler() {
    const isSuccess = await createPerson({
      name: personName,
      biography: sourcesToString(list, '\n'),
      source: sourcesToString(sourceList, '\n'),
    })
    if (isSuccess) {
      setShouldShowEditMode(false)
    }
  }
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
      <AddInputButton addTarget="經歷" onClick={addSource}></AddInputButton>

      <EditSource sourceList={sourceList} setSourceList={setSourceList} />
      <EditSendOrCancel
        onClick={() => setShouldShowEditMode(false)}
        submitHandler={() => submitHandler()}
      />
    </Fragment>
  )
}
