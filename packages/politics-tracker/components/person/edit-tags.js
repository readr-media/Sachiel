import React, { Fragment, useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { SourceInputWrapper } from './edit-source'
import SourceInput from '../politics/source-input'
import { useToast } from '~/components/toast/use-toast'

import styled from 'styled-components'
import AddInputButton from './add-input-button'
import EditSendOrCancel from './edit-send-or-cancel'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
import GetExistTags from '~/graphql/query/person/get-exist-tags.graphql'
import CreateTags from '~/graphql/mutation/person/create-tags.graphql'
import CreatePerson from '~/graphql/mutation/person/create-person.graphql'
import { logGAEvent } from '~/utils/analytics'

export const InputWrapperNoLabel = styled(SourceInputWrapper)`
  label {
    display: none;
  }
`

/**
 *
 * @param {Object} props
 * @param {import("~/types/person").Person["tags"]} props.tags
 * @param {import("~/types/person").Person["id"]} props.personId
 * @param {import("~/types/person").Person["name"]} props.personName
 * @param {function} props.setShouldShowEditMode
 * @returns {React.ReactElement}
 */
export default function EditTags(props) {
  const toast = useToast()

  const [tagList, setTagList] = useState(props.tags)

  // check whether tagList-list value has ('')
  // if have (''), return true
  // @ts-ignore
  const tagsValueCheck = takeArrayKeyName(tagList, 'name')?.some(
    (x) => x === ''
  )

  /**
   * If property `value` of element in `tagList` are all empty string,
   * then should disable submit button.
   */
  const shouldDisableSubmit = useMemo(
    () =>
      tagList.filter((i) => i.name).length === 0 ||
      // @ts-ignore
      JSON.stringify(takeArrayKeyName(tagList, 'name')) ===
        // @ts-ignore
        JSON.stringify(takeArrayKeyName(props.tags, 'name')) ||
      tagsValueCheck,
    [tagList]
  )
  //take tagList's name to compare with props.tags's name
  //if the same then shouldDisableSubmit = true
  /**
   * @param {Array<Object>} array
   * @param {number} key
   */
  function takeArrayKeyName(array, key) {
    return array.map(function (item) {
      // @ts-ignore
      return item[key]
    })
  }
  /**
   * @param {string} key
   * @param {string} value
   * @returns {{[key: string]: string}}
   */
  const stringToObject = (key, value) => {
    return {
      [key]: value,
    }
  }

  /**
   * @param {Object[]|[]} tagList
   * @param {string} cmsApiUrl
   */
  async function createPerson(tagList, cmsApiUrl) {
    try {
      const variables = {
        data: {
          name: props.personName,
          thread_parent: {
            connect: { id: props.personId },
          },
          tags: {
            connect: tagList,
          },
        },
      }

      const result = await fireGqlRequest(
        print(CreatePerson),
        variables,
        cmsApiUrl
      )
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  /**
   * @param {Object[]|[]} tagList
   * @param {string} cmsApiUrl
   */
  async function createTags(tagList, cmsApiUrl) {
    try {
      const result = await fireGqlRequest(
        print(CreateTags),
        {
          data: tagList,
        },
        cmsApiUrl
      )
      if (result.errors) {
        console.error(result.errors[0]?.message)
        return []
      }
      return result
    } catch (err) {
      console.error(err)
      return []
    }
  }

  /**
   * @param {string[]|[]} tagList
   * @param {string} cmsApiUrl
   */
  async function getExistTags(tagList, cmsApiUrl) {
    try {
      const result = await fireGqlRequest(
        print(GetExistTags),
        {
          TagsName: tagList,
        },
        cmsApiUrl
      )
      if (result.errors) {
        console.log(result.errors[0]?.message)
      }
      return result
    } catch (err) {
      console.error(err)
    }
  }
  async function submitTag() {
    const cmsApiUrl = `${window.location.origin}/api/data`

    try {
      //check the tags wanted to submit is existed or not
      /**@type {string[]} */
      const allTagsName = tagList.map((tag) => {
        return tag.name.trim()
      })
      const existTagsData = await getExistTags(allTagsName, cmsApiUrl)
      /** @type {{id:string,name:string}[]} */
      const existTags = existTagsData.data.tags

      const existsTagsName = existTags.map((tag) => tag.name)

      const unRegisteredTags = allTagsName
        .filter((tag) => existsTagsName.indexOf(tag) === -1)
        .map((tag) => {
          return stringToObject('name', tag)
        })
        .filter((tag) => tag.name)
      let submitTagList
      if (unRegisteredTags.length !== 0) {
        //create new Tags at cms

        await createTags(unRegisteredTags, cmsApiUrl)
        submitTagList = [
          ...existTags
            .map((tag) => {
              return stringToObject('name', tag.name)
            })
            .filter((tag) => tag.name),
          ...unRegisteredTags,
        ]
      } else {
        submitTagList = [
          ...existTags
            .map((tag) => {
              return stringToObject('name', tag.name)
            })
            .filter((tag) => tag.name),
        ]
      }
      return await createPerson(submitTagList, cmsApiUrl)
    } catch (err) {
      console.error(err)
      return false
    }
  }
  async function submitHandler() {
    const isSuccess = await submitTag()
    if (isSuccess) {
      toast.open({
        status: 'success',
        title: '送出成功',
        desc: '通過志工審核後，您新增的資料就會出現在這裡',
      })
      props.setShouldShowEditMode(false)
    } else {
      toast.open({
        status: 'fail',
        title: '出了點問題...',
        desc: '送出失敗，請重試一次',
      })
    }
  }
  function addSource() {
    const extended = [...tagList, { id: uuidv4(), name: '' }]
    setTagList(extended)
  }

  /**
   *
   * @param {string} id
   * @param {string} name
   */
  function updateSource(id, name) {
    const updated = tagList.map((item) => {
      if (id === item.id) {
        return { ...item, name }
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
            value={item.name}
            error={''}
            showError={false}
            removable={index !== 0}
            onChange={updateSource}
            onDelete={deleteSource}
          />
        </InputWrapperNoLabel>
      ))}
      <AddInputButton addTarget="標籤" onClick={addSource}></AddInputButton>
      <EditSendOrCancel
        isDisable={shouldDisableSubmit}
        onClick={() => props.setShouldShowEditMode(false)}
        submitHandler={() => submitHandler()}
        GAClick={() => {
          logGAEvent('click', '點擊「標籤」區塊的「送出審核」')
        }}
      />
    </Fragment>
  )
}
