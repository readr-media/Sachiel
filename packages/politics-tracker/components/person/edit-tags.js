import React, { Fragment, useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { stringToSources, getNewSource } from '~/utils/utils'
import { SourceInputWrapper } from './edit-source'
import SourceInput from '../politics/source-input'

import styled from 'styled-components'
import EditSource from './edit-source'
import AddInputButton from './add-input-button'
import EditSendOrCancel from './edit-send-or-cancel'
import { print } from 'graphql'
import { fireGqlRequest } from '~/utils/utils'
import GetExistTags from '~/graphql/query/person/get-exist-tags.graphql'
import CreateTags from '~/graphql/mutation/person/create-tags.graphql'
import CreatePerson from '~/graphql/mutation/person/create-person.graphql'

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
  /**
   *
   * @param {import("~/types/person").Person["tags"]} tagList
   * @returns
   */
  async function createTags(tagList) {
    const cmsApiUrl = `${window.location.origin}/api/data`

    try {
      //checkout the tags wanted to submit is existed or not
      const tags = tagList.map((tag) => tag.name)
      const existsTags = await fireGqlRequest(
        print(GetExistTags),
        { TagsName: { tags } },
        cmsApiUrl
      )

      console.log(existsTags)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const tags = useMemo(
    () =>
      props.tags.length !== 0
        ? props.tags.map((item) => {
            return Object.assign(
              {},
              { id: uuidv4(), value: item.name, error: '' }
            )
          })
        : [],
    [props.tags]
  )
  const [tagList, setTagList] = useState(tags)

  /**
   * @param {Object[]|[]} tagList
   * @param {string} cmsApiUrl
   */
  async function createPerson(tagList, cmsApiUrl) {
    console.log(tagList)
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
      console.log(result)
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
        return tag.value.trim()
      })

      const existTagsData = await getExistTags(allTagsName, cmsApiUrl)

      /** @type {{id:string,name:string}[]} */
      const existTags = existTagsData.data.tags

      const unRegisteredTags = existTags
        .map((tag) => tag.name)
        .filter((tag) => allTagsName.indexOf(tag) === -1)

      let submitTagList
      if (unRegisteredTags.length !== 0) {
        //create new Tags at cms

        const unRegisteredTagsName = unRegisteredTags.map((tag) => {
          return { name: tag }
        })
        const createTagsData = await createTags(unRegisteredTagsName, cmsApiUrl)
        submitTagList = [
          ...existTags
            .map((/**@type {{name:string}}*/ tag) => {
              return { name: tag.name }
            })
            .filter((/**@type {{name:string}}*/ tag) => tag.name),
          ...unRegisteredTagsName,
        ]
      } else {
        submitTagList = [
          ...existTags
            .map((/**@type {{name:string}}*/ tag) => {
              return { name: tag.name }
            })
            .filter((/**@type {{name:string}}*/ tag) => tag.name),
        ]
      }
      const result = await createPerson(submitTagList, cmsApiUrl)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }
  async function submitHandler() {
    const isSuccess = await submitTag()
    console.log(isSuccess)
  }
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
        submitHandler={() => submitHandler()}
      />
    </Fragment>
  )
}
