import type { Politic } from '~/types/politics'
import type { RawPolitic } from '~/types/common'
import dynamic from 'next/dynamic'
import { print } from 'graphql'
import {
  usePersonElectionId,
  usePoliticAmount,
  usePoliticList,
} from './react-context/use-politics'
import { useToast } from '../toast/use-toast'
import { fireGqlRequest } from '~/utils/utils'
import { useState } from 'react'
import classNames from 'classnames'
import { SOURCE_DELIMITER } from '~/constants/politics'
import SourceItem from './source-item'
import PoliticContent from './politic-content'
const PoliticForm = dynamic(() => import('./politic-form'), {
  ssr: false,
})
import Edit from '~/components/icons/edit'
import AddPoliticToThread from '~/graphql/mutation/politics/add-politic-to-thread.graphql'
import s from './politic-body.module.css'

type PoliticBodyProps = Politic & { no: number }

export default function PoliticBody(props: PoliticBodyProps): JSX.Element {
  const [isEditing, setEditing] = useState<boolean>(false)
  const index = `${String(props.no).padStart(2, '0')}.`
  const sources = props.source.split(SOURCE_DELIMITER)
  const sourceList = sources.map((s, i) => (
    <SourceItem key={i} no={i + 1} content={s} />
  ))

  const toast = useToast()
  const politicAmount = usePoliticAmount()
  const personElectionId: string = usePersonElectionId()
  const waitingPoliticList = usePoliticList()

  async function appendPoliticToThread(data: Politic): Promise<boolean> {
    const cmsApiUrl = `${window.location.origin}/api/data`

    try {
      const variables = {
        data: {
          thread_parent: {
            connect: {
              id: data.id,
            },
          },
          person: {
            connect: {
              id: personElectionId,
            },
          },
          desc: data.desc,
          source: data.source,
          content: data.content,
        },
      }
      // result is not used currently
      // eslint-disable-next-line
      const result: RawPolitic = await fireGqlRequest(
        print(AddPoliticToThread),
        variables,
        cmsApiUrl
      )

      const amount = politicAmount.amount
      politicAmount.setAmount({
        ...amount,
        waiting: amount.waiting + 1,
      })

      waitingPoliticList.addToList({
        id: String(new Date().valueOf()),
        ...variables.data,
        tagId: null,
        tagName: null,
        createdAt: null,
        updatedAt: null,
      })

      toast.open({
        status: 'success',
        title: '送出成功',
        desc: '通過志工審核後，您修改的政見就會出現在這裡',
      })

      setEditing(false)

      return true
    } catch (err) {
      console.error(err)

      toast.open({
        status: 'fail',
        title: '出了點問題...',
        desc: '送出失敗，請重試一次',
      })

      return false
    }
  }

  const style = classNames(s['container'], { [s['editing']]: isEditing })

  return (
    <div className={style}>
      <span className={s['index']}>{index}</span>
      <div className={s['content-group']}>
        {isEditing ? (
          <PoliticForm
            politic={props}
            closeForm={() => setEditing(false)}
            submitForm={appendPoliticToThread}
          />
        ) : (
          <>
            <div className={s['content']}>
              <PoliticContent>{props.desc}</PoliticContent>
            </div>
            <div className={s['source-group']}>
              <div className={s['source-label']}>
                <span>來源</span>
              </div>
              <div className={s['source-list']}>{sourceList}</div>
            </div>
            <div className={s['button-edit']} onClick={() => setEditing(true)}>
              <div className={s['button-inner']}>
                <span>編輯</span>
                <span className={s['button-icon']}>
                  <Edit />
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
