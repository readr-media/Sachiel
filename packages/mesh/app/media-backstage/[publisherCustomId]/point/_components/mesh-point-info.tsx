'use client'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { useUser } from '@/context/user'

export default function MeshPointInfo({
  balance,
}: {
  balance: number | undefined
}) {
  const { user } = useUser()
  const doesUserOwnMultiMedia =
    user.publishers?.length && user.publishers?.length > 1
  return (
    <section className="flex flex-col gap-4 px-10 pb-6 pt-8">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 text-primary-500">
          <div className="profile-subtitle">讀選點數</div>
          <div className="flex h-8 flex-row items-center gap-1">
            <Icon iconName="icon-mesh-point" size="m" className="size-6" />
            <p className="hero-title text-primary-700">
              {balance?.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          {doesUserOwnMultiMedia && (
            <div className="caption-2">此為所有管理帳號的點數總額</div>
          )}
        </div>
        <div className="w-[112px]">
          <Button
            text="點數兌換"
            onClick={() => {}}
            size="lg"
            color="custom-blue"
          />
        </div>
      </div>
      <div className="rounded-xl border-primary-200 bg-primary-100 py-3 pl-6 pr-[280px] text-primary-600">
        收益每兩個月結算一次，結算日為次月五號，請於結算日前兌換，否則收益將計入下一期報表
        例：1-2 月收益，應於 3/5
        前兌換，若未兌換，收益將記入下個結算日（5/5）之報表
      </div>
    </section>
  )
}
