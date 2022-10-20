import React, { Fragment, useState, useMemo } from 'react'
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
import ListItem from './list-item'
import { useToast } from '../toast/use-toast'
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
  const toast = useToast()
  const [list, setList] = useState(
    listData ? stringToSources(listData, '\n') : [getNewSource()]
  )
  const [sourceList, setSourceList] = useState(
    sources ? stringToSources(sources, '\n') : [getNewSource()]
  )

  /**
   * If property `value` of element in `sourceList` are all empty string,
   * of property `value` of element in `list` are all empty string,
   * then should disable submit button.
   */
  const shouldDisableSubmit = useMemo(
    () =>
      list.filter((i) => i.value).length === 0 ||
      sourceList.filter((i) => i.value).length === 0,
    [list, sourceList]
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
      toast.open({
        status: 'success',
        title: '送出成功',
        desc: '通過志工審核後，您新增的資料就會出現在這裡',
      })
      setShouldShowEditMode(false)
    } else {
      toast.open({
        status: 'fail',
        title: '出了點問題...',
        desc: '送出失敗，請重試一次',
      })
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
        isDisable={shouldDisableSubmit}
        onClick={() => setShouldShowEditMode(false)}
        submitHandler={() => submitHandler()}
      />
    </Fragment>
  )
}
