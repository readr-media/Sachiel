import classNames from 'classnames'
import { print } from 'graphql'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState } from 'react'

import Edit from '~/components/icons/edit'
import AddPoliticToThread from '~/graphql/mutation/politics/add-politic-to-thread.graphql'
import { PROGRESS, RawPolitic } from '~/types/common'
import type { Politic } from '~/types/politics'
import { logGAEvent } from '~/utils/analytics'
import { fireGqlRequest } from '~/utils/utils'

import ArrowRight from '../icons/arrow-right'
import { useToast } from '../toast/use-toast'
import s from './politic-body.module.css'
import PoliticContent from './politic-content'
import FactCheckAbstract from './politic-fact-check'
import {
  usePersonElection,
  usePoliticAmount,
  usePoliticList,
} from './react-context/use-politics'
const PoliticForm = dynamic(() => import('./politic-form'), {
  ssr: false,
})

type PoliticBodyProps = Politic & { no: number } & {
  hidePoliticDetail: string | null
}

export default function PoliticBody(props: PoliticBodyProps): JSX.Element {
  const [isEditing, setEditing] = useState<boolean>(false)
  const index = `${String(props.no).padStart(2, '0')}.`

  const toast = useToast()
  const politicAmount = usePoliticAmount()
  const personElection = usePersonElection()
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
              id: personElection.id,
            },
          },
          desc: data.desc,
          source: data.source,
          content: data.content,
          positionChange: {
            connect: data.positionChange.map((positionChangeItem) => ({
              id: positionChangeItem.id,
            })),
          },
          factCheck: {
            connect: data.factCheck.map((factCheckItem) => ({
              id: factCheckItem.id,
            })),
          },
          expertPoint: {
            connect: data.expertPoint.map((expertPointItem) => ({
              id: expertPointItem.id,
            })),
          },
          repeat: {
            connect: data.repeat.map((repeatItem) => ({ id: repeatItem.id })),
          },
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
        politicCategoryId: null,
        politicCategoryName: null,
        createdAt: null,
        updatedAt: null,
        positionChange: [],
        factCheck: [],
        expertPoint: [],
        repeat: [],
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

  const status = personElection.elected
    ? props.progress ?? PROGRESS.NOT_START
    : 'failed'
  const statusStyle = classNames(s['status'], s[status])

  function getStatusText(status: `${PROGRESS}` | 'failed') {
    const map: Record<PROGRESS | 'failed', string> = {
      'no-progress': '未開始',
      'in-progress': '進行中',
      'in-trouble': '卡關中',
      complete: '已完成',
      failed: '未當選',
    }

    return map[status]
  }

  // Compare the hidingDate with the current date and decide whether to hide the FactCheckAbstract component.
  // - If hidingDate is null, the FactCheckAbstract component will not be shown, for the shouldShow variable is calculated as false.
  // - To compare dates correctly, compare the timestamp values by using getTime()
  const hidingDate = props.hidePoliticDetail
    ? new Date(props.hidePoliticDetail)
    : null
  const currentDate = new Date()
  const shouldShow =
    hidingDate !== null && hidingDate.getTime() > currentDate.getTime()

  return (
    <div className={style}>
      <div className={s['container']}>
        <div className={s['header']}>
          <span className={s['index']}>{index}</span>
          {personElection.isFinished && (
            <span className={s['politic-status']}>
              <span className={s['text']}>達成進度</span>
              <span className={statusStyle}>{getStatusText(status)}</span>
            </span>
          )}
        </div>
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
              {shouldShow && (
                <FactCheckAbstract
                  positionChange={props.positionChange}
                  factCheck={props.factCheck}
                  expertPoint={props.expertPoint}
                  repeat={props.repeat}
                />
              )}
              <div className={s['control-group']}>
                <div className={s['button']} onClick={() => setEditing(true)}>
                  <span>編輯</span>
                  <span className={s['button-icon']}>
                    <Edit />
                  </span>
                </div>
                <div className={s['divider']}></div>
                <Link
                  href={{
                    pathname: '/politics/detail/[politicId]',
                    query: {
                      politicId: props.id,
                    },
                  }}
                  legacyBehavior={false}
                  className={s['button']}
                  onClick={() => logGAEvent('click', '點擊「政見細節」')}
                >
                  <span>政見細節</span>
                  <span className={s['button-icon']}>
                    <ArrowRight />
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
