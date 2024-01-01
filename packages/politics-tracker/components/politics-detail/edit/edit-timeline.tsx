import { print } from 'graphql'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import Minus from '~/components/icons/minus'
import InputItem from '~/components/politics-detail/edit/input-item'
import AddInputButton from '~/components/shared/add-input-button'
import EditSendOrCancel from '~/components/shared/edit-send-or-cancel'
import { useToast } from '~/components/toast/use-toast'
import AddEditingPolitic from '~/graphql/mutation/politics/add-editing-politic-to-thread.graphql'
import CreateTimelines from '~/graphql/mutation/politics-detail/create-timelines.graphql'
import EditCalender from '~/public/icons/edit-calender.svg'
import EditLink from '~/public/icons/edit-link.svg'
import EditText from '~/public/icons/edit-text.svg'
import { PoliticDetail, PoliticTimeLine } from '~/types/politics-detail'
import {
  covertTimeToISOS,
  getItemsToAdd,
  getItemsToConnect,
} from '~/utils/politics-detail'
import { fireGqlRequest } from '~/utils/utils'

const Notion = styled.p`
  color: ${({ theme }) => theme.textColor.black50};
  margin-bottom: 20px;
`

const InputGroup = styled.div`
  border-left: 4px solid ${({ theme }) => theme.backgroundColor.yellow};
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
      color: ${({ theme }) => theme.textColor.yellow};
    }
  }
`

type EditTimelineProps = {
  politic: PoliticDetail
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditTimeline({
  politic,
  setEditMode,
}: EditTimelineProps): JSX.Element {
  const { id = '', timeline = [] } = politic
  const toast = useToast()
  const [list, setList] = useState(timeline)

  //「新增」填寫欄位
  function addList() {
    const extended: PoliticTimeLine[] = [
      ...list,
      { id: `add-${uuidv4()}`, eventDate: '', content: '', link: '' },
    ]
    setList(extended)
  }

  //「刪除」填寫欄位
  function deleteList(id: string) {
    const remain = list.filter((item) => id !== item.id)
    setList(remain)
  }

  //「修改」欄位內容
  function updateInputValue(id: string, labelName: string, value: string) {
    const updated = list.map((item) => {
      if (id === item.id) {
        return { ...item, [labelName]: value }
      }
      return item
    })
    setList(updated)
  }

  // 「送出審核」條件判定：有更改內容 or 有新增內容 ＆ 沒有任何欄位空白才可送出
  const shouldDisableSubmit = useMemo(() => {
    const hasEmptyValue = list.some(
      (obj) => obj.content === '' || obj.link === '' || obj.eventDate === ''
    )
    const isListEqualToTimeline =
      JSON.stringify(list) === JSON.stringify(timeline)
    return hasEmptyValue || isListEqualToTimeline
  }, [list, timeline])

  // -------------------------------------------------------

  //要在 CMS 新增一筆的 timeline（新增、修改）
  const timelineToAdd = getItemsToAdd(list, timeline)

  //CMS 現有的 timeline 需要新增 connect 到新建立的 edit politic id
  const connectTimeline = getItemsToConnect(list, timelineToAdd)

  //新建一筆帶有既有欄位資料的 editing Politic
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

  async function addTimelines(
    timelineList: PoliticTimeLine[] | [],
    cmsApiUrl: string,
    politicId: number
  ) {
    try {
      const variables = {
        data: timelineList.map((item) => ({
          link: item.link,
          content: item.content,
          eventDate: covertTimeToISOS(item.eventDate),
          editingPolitic: {
            connect: { id: politicId },
          },
        })),
      }

      const result = await fireGqlRequest(
        print(CreateTimelines),
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

  //同時執行 addEditingPoliticToThread & addTimelines 流程
  async function submitTimeline() {
    const cmsApiUrl = `${window.location.origin}/api/data`

    try {
      const editTimelineVariables = {
        data: {
          thread_parent: {
            connect: {
              id: id,
            },
          },
          timeline: {
            connect: connectTimeline.map((item) => ({
              id: item.id,
            })),
          },
        },
      }

      const {
        data: { createEditingPolitic },
      } = await addEditingPolitic(cmsApiUrl, editTimelineVariables)

      //create new timelines at CMS
      return await addTimelines(
        //@ts-ignore
        timelineToAdd,
        cmsApiUrl,
        createEditingPolitic.id
      )
    } catch (err) {
      console.error(err)
      return false
    }
  }
  async function submitHandler() {
    const isSuccess = await submitTimeline()
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

  const shouldShowNotion = Boolean(list?.length)

  return (
    <>
      {shouldShowNotion && (
        <Notion>日期格式為 yyyy-mm-dd，若不確定請寫目前日期。</Notion>
      )}

      {list?.map((item) => (
        <InputGroup key={item.id}>
          <div>
            <InputItem
              id={item.id}
              icon={<EditCalender />}
              placeholder="2022-01-01"
              value={item.eventDate.slice(0, 10)}
              label="eventDate"
              onChange={updateInputValue}
            />
            <InputItem
              id={item.id}
              icon={<EditText />}
              placeholder="請輸入標題"
              value={item.content}
              label="content"
              onChange={updateInputValue}
            />
            <InputItem
              id={item.id}
              icon={<EditLink />}
              placeholder="https://www.readr.tw"
              value={item.link}
              label="link"
              onChange={updateInputValue}
            />
          </div>

          <span onClick={() => deleteList(item.id)} className="delete-button">
            <Minus />
          </span>
        </InputGroup>
      ))}

      <AddInputButton addTarget="進度" onClick={addList} colorType="yellow" />

      <EditSendOrCancel
        colorType="yellow"
        isDisable={shouldDisableSubmit}
        onClick={() => setEditMode(false)}
        submitHandler={() => submitHandler()}
      />
    </>
  )
}
