// eslint-disable-next-line simple-import-sort/imports
import { print } from 'graphql'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import Minus from '~/components/icons/minus'
import InputItem from '~/components/politics-detail/edit/input-item'
import AddInputButton from '~/components/shared/add-input-button'
import EditSendOrCancel from '~/components/shared/edit-send-or-cancel'
import { useToast } from '~/components/toast/use-toast'
import CreateControversies from '~/graphql/mutation/politics-detail/create-controversies.graphql'
import AddEditingPolitic from '~/graphql/mutation/politics/add-editing-politic-to-thread.graphql'
import EditLink from '~/public/icons/edit-link.svg'
import EditText from '~/public/icons/edit-text.svg'
import { PoliticControversy, PoliticDetail } from '~/types/politics-detail'
import {
  getControversyToAdd,
  getControversyToConnect,
} from '~/utils/politics-detail'
import { fireGqlRequest } from '~/utils/utils'

const InputGroup = styled.div`
  border-left: 4px solid #f6ba31;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    width: 100%;
  }

  & + * {
    margin-top: 16px;
  }

  .delete-button {
    svg {
      width: 32px;
      height: 32px;
      margin-left: 4px;
      cursor: pointer;
      color: #b2800d;
    }
  }
`

type EditControversiesProps = {
  politic: PoliticDetail
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditControversies({
  politic,
  setEditMode,
}: EditControversiesProps): JSX.Element {
  const { id = '', controversies = [] } = politic

  const toast = useToast()
  const [list, setList] = useState(controversies)

  //「新增」填寫欄位
  function addList() {
    const extended: PoliticControversy[] = [
      ...list,
      { id: `add-${uuidv4()}`, content: '', link: '' },
    ]
    setList(extended)
  }

  //「刪除」填寫欄位
  function deleteList(id: string) {
    const remain = list.filter((item) => id !== item.id)
    setList(remain)
  }

  //「修改」link 欄位內容
  function updateLink(id: string, link: string) {
    const updated = list.map((item) => {
      if (id === item.id) {
        return { ...item, link }
      }
      return item
    })
    setList(updated)
  }

  //「修改」content 欄位內容
  function updateContent(id: string, content: string) {
    const updated = list.map((item) => {
      if (id === item.id) {
        return { ...item, content }
      }
      return item
    })
    setList(updated)
  }

  // 「送出審核」條件判定：有更改內容 or 有新增內容 ＆ 沒有任何欄位空白才可送出
  const shouldDisableSubmit = useMemo(() => {
    const hasEmptyValue = list.some(
      (obj) => obj.content === '' || obj.link === ''
    )
    const isListEqualToControversies =
      JSON.stringify(list) === JSON.stringify(controversies)
    return hasEmptyValue || isListEqualToControversies
  }, [list, controversies])

  // -------------------------------------------------------

  //要在 CMS 新增一筆的 controversies（新增、修改）
  const controversyToAdd = getControversyToAdd(list, controversies)

  //CMS 現有的 controversy 需要新增 connect 到新建立的 edit politic id
  const connectControversy = getControversyToConnect(list, controversyToAdd)

  //新建一筆帶有既有欄位資料的 Politic
  async function addEditingPolitic(cmsApiUrl: string, variables: any) {
    try {
      const result = await fireGqlRequest(
        print(AddEditingPolitic),
        variables,
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

  async function addControversies(
    controversyList: PoliticControversy[] | [],
    cmsApiUrl: string,
    politicId: number
  ) {
    try {
      const variables = {
        data: controversyList.map((item: PoliticControversy) => ({
          link: item.link,
          content: item.content,
          editingPolitic: {
            connect: { id: politicId },
          },
        })),
      }

      const result = await fireGqlRequest(
        print(CreateControversies),
        variables,
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

  //同時執行 addPoliticToThread & addControversies 流程
  async function submitControversy() {
    const cmsApiUrl = `${window.location.origin}/api/data`

    try {
      const editControversyVariables = {
        data: {
          thread_parent: {
            connect: {
              id: id,
            },
          },
          controversies: {
            connect: connectControversy.map((item) => ({
              id: item.id,
            })),
          },
        },
      }

      const {
        data: { createEditingPolitic },
      } = await addEditingPolitic(cmsApiUrl, editControversyVariables)

      //create new controversies at CMS
      return await addControversies(
        controversyToAdd,
        cmsApiUrl,
        createEditingPolitic.id
      )
    } catch (err) {
      console.error(err)
      return false
    }
  }
  async function submitHandler() {
    const isSuccess = await submitControversy()
    if (isSuccess) {
      toast.open({
        status: 'success',
        title: '送出成功',
        desc: '通過志工審核後，您新增的資料就會出現在這裡',
      })
      setEditMode(false)
    } else {
      toast.open({
        status: 'fail',
        title: '出了點問題...',
        desc: '送出失敗，請重試一次',
      })
    }
  }

  return (
    <>
      {list?.map((item) => (
        <InputGroup key={item.id}>
          <div>
            <InputItem
              id={item.id}
              icon={<EditText />}
              placeholder="請輸入標題"
              value={item.content}
              onChange={updateContent}
            />
            <InputItem
              id={item.id}
              icon={<EditLink />}
              placeholder="https://www.readr.tw"
              value={item.link}
              onChange={updateLink}
            />
          </div>

          <span onClick={() => deleteList(item.id)} className="delete-button">
            <Minus />
          </span>
        </InputGroup>
      ))}

      <AddInputButton
        addTarget="相關爭議"
        onClick={addList}
        colorType="yellow"
      />

      <EditSendOrCancel
        colorType="yellow"
        isDisable={shouldDisableSubmit}
        onClick={() => setEditMode(false)}
        submitHandler={() => submitHandler()}
      />
    </>
  )
}
