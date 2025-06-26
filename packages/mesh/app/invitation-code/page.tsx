import { notFound, redirect } from 'next/navigation'
import { Fragment } from 'react'

import Avatar from '@/components/story-card/avatar'

import { getCurrentUser } from '../actions/auth'
import {
  getSentInvitationCodes,
  getValidInvitationCodes,
} from '../actions/invitation-code'
import CopyCodeButton from './_components/copy-code-button'

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')

  const validCode = await getValidInvitationCodes(memberId)
  const usedCodeData = await getSentInvitationCodes(memberId)
  if (!usedCodeData || !validCode) notFound()

  return (
    <div className="flex flex-col items-center justify-center sm:gap-5 sm:p-5 xl:p-10">
      <div className="flex w-full max-w-[600px] flex-col rounded-md bg-white sm:w-articleMain sm:max-w-none sm:px-5 sm:py-2 sm:drop-shadow lg:w-[900px] xl:w-[1040px]">
        <h2 className="list-title px-5 pb-1 pt-4 text-primary-700">{`可用的邀請碼（${validCode.length}）`}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 ">
          {validCode.length ? (
            validCode.map((v, i) => (
              <Fragment key={i}>
                <div className="mx-5 flex flex-row items-center justify-between border-b-[0.5px] border-primary-200 py-5">
                  <p>{v.code ?? ''}</p>
                  <CopyCodeButton code={v.code ?? ''} />
                </div>
              </Fragment>
            ))
          ) : (
            <p className="button-large px-5 pb-5 pt-3 text-primary-400">
              目前沒有可用的邀請碼...
            </p>
          )}
        </div>
      </div>
      {usedCodeData.length ? (
        <div className="flex w-full max-w-[600px] flex-col rounded-md bg-white sm:w-articleMain sm:max-w-none sm:px-5 sm:py-2 sm:drop-shadow lg:w-[900px] xl:w-[1040px]">
          <h2 className="list-title px-5 pb-1 pt-4 text-primary-700">已使用</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 ">
            {usedCodeData.map((v, i) => (
              <Fragment key={i}>
                <div className="mx-5 flex flex-row items-center justify-between border-b-[0.5px] border-primary-200 py-5">
                  <p className="subtitle-1 text-primary-400">{v.code}</p>
                  <div className="flex flex-row items-center gap-2">
                    <p className="footnote line-clamp-1">
                      {v.receive?.name ?? ''}
                    </p>
                    <Avatar src={v.receive?.avatar ?? ''} size="m" />
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
