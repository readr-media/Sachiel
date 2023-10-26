import { print } from 'graphql'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import Minus from '~/components/icons/minus'
import InputItem from '~/components/politics-detail/edit/input-item'
import AddInputButton from '~/components/shared/add-input-button'
import EditSendOrCancel from '~/components/shared/edit-send-or-cancel'
import { useToast } from '~/components/toast/use-toast'
import AddPoliticToThread from '~/graphql/mutation/politics/add-politic-to-thread.graphql'
import CreateControversies from '~/graphql/mutation/politics-detail/create-controversies.graphql'
import EditLink from '~/public/icons/edit-link.svg'
import EditText from '~/public/icons/edit-text.svg'
import { Controversy, PoliticDetail } from '~/types/politics-detail'
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
  politicData: PoliticDetail
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditControversies({
  politicData,
  setEditMode,
}: EditControversiesProps): JSX.Element {
  const {
    id = '',
    content = '',
    current_progress = '',
    desc = '',
    expertPoint = [],
    person = null,
    timeline = [],
    source = '',
    status = '',
    positionChange = [],
    factCheck = [],
    repeat = [],
    response = [],
    controversies = [],
    contributer = '',
    politicCategory = null,
    organization = null,
  } = politicData

  const toast = useToast()
  const [list, setList] = useState(controversies)

  //「新增」填寫欄位
  function addList() {
    const extended: Controversy[] = [
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

  //要在 CMS 新增的 controversies
  const controversyToAdd = getControversyToAdd(list, controversies)

  //紀錄相關爭議編輯內容，傳入 Politics
  const changeLogData = controversyToAdd.map((item) => ({
    爭議內容: item.content,
  }))

  //CMS 現存的 controversy 需要新增 connect
  const connectControversy = getControversyToConnect(list, controversyToAdd)

  //新建一筆帶有既有欄位資料的 Politic
  async function addPoliticToThread(cmsApiUrl: string) {
    try {
      const variables = {
        data: {
          changeLog: `相關爭議：${JSON.stringify(changeLogData)}`,
          reviewed: false,
          contributer: contributer,
          thread_parent: {
            connect: {
              id: id,
            },
          },
          person: {
            connect: {
              id: person?.id,
            },
          },
          desc: desc,
          source: source,
          content: content,
          status: status,
          current_progress: current_progress,
          controversies: {
            connect: connectControversy.map((item: any) => ({
              id: item.id,
            })),
          },
          positionChange: {
            connect: positionChange.map((positionChangeItem) => ({
              id: positionChangeItem.id,
            })),
          },
          factCheck: {
            connect: factCheck.map((factCheckItem) => ({
              id: factCheckItem.id,
            })),
          },
          expertPoint: {
            connect: expertPoint.map((expertPointItem) => ({
              id: expertPointItem.id,
            })),
          },
          repeat: {
            connect: repeat.map((repeatItem) => ({ id: repeatItem.id })),
          },
          response: {
            connect: response.map((responseItem) => ({ id: responseItem.id })),
          },
          timeline: {
            connect: timeline.map((timelineItem) => ({ id: timelineItem.id })),
          },
          politicCategory: politicCategory
            ? {
                connect: {
                  id: politicCategory.id,
                },
              }
            : null,

          organization: organization
            ? {
                connect: {
                  id: organization.id,
                },
              }
            : null,
        },
      }

      const result = await fireGqlRequest(
        print(AddPoliticToThread),
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
    controversyList: Controversy[] | [],
    cmsApiUrl: string,
    politicId: number
  ) {
    try {
      const variables = {
        data: controversyList.map((item: Controversy) => ({
          link: item.link,
          content: item.content,
          politic: {
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
      const {
        data: { createPolitic },
      } = await addPoliticToThread(cmsApiUrl)

      //create new controversies at CMS
      return await addControversies(
        controversyToAdd,
        cmsApiUrl,
        createPolitic.id
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
