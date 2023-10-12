// import { print } from 'graphql'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import Minus from '~/components/icons/minus'
import InputItem from '~/components/politics-detail/edit/input-item'
import AddInputButton from '~/components/shared/add-input-button'
import EditSendOrCancel from '~/components/shared/edit-send-or-cancel'
// import { useToast } from '~/components/toast/use-toast'
// import CreateControversies from '~/graphql/mutation/politics-detail/create-politic-controversies.graphql'
import EditLink from '~/public/icons/edit-link.svg'
import EditText from '~/public/icons/edit-text.svg'
// import type { Person } from '~/types/person'
import { Controversy } from '~/types/politics-detail'
// import { fireGqlRequest } from '~/utils/utils'

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
  controversies: Controversy[]
  // personId?: Person['id']
  // personName?: Person['name']
  // setShouldShowEditMode?: React.Dispatch<React.SetStateAction<boolean>>
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
}
export default function EditControversies({
  controversies,
  setEditMode,
}: EditControversiesProps): JSX.Element {
  // const toast = useToast()
  const [list, setList] = useState(controversies)

  //新增 - 相關爭議填寫欄位
  function addList() {
    const extended: Controversy[] = [
      ...list,
      { id: uuidv4(), content: '', link: '' },
    ]
    setList(extended)
  }

  //刪除 - 相關爭議填寫欄位
  function deleteList(id: string) {
    const remain = list.filter((item) => id !== item.id)
    setList(remain)
  }

  //更新 - 對應 id 的 link 內容
  function updateLink(id: string, link: string) {
    const updated = list.map((item) => {
      if (id === item.id) {
        return { ...item, link }
      }
      return item
    })
    setList(updated)
  }

  //更新 - 對應 id 的 content 內容
  function updateContent(id: string, content: string) {
    const updated = list.map((item) => {
      if (id === item.id) {
        return { ...item, content }
      }
      return item
    })
    setList(updated)
  }

  const shouldDisableSubmit = useMemo(() => {
    const hasEmptyValue = list.some(
      (obj) => obj.content === '' || obj.link === ''
    )
    const isListEqualToControversies =
      JSON.stringify(list) === JSON.stringify(controversies)
    return hasEmptyValue || isListEqualToControversies
  }, [list, controversies])

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
        // submitHandler={() => submitHandler()}
        submitHandler={() => console.log('submit')}
      />
    </>
  )
}
