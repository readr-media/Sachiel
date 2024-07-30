'use client'

import Link from 'next/link'

import Button from '@/components/button'
import Icon from '@/components/icon'
import { DynamicWidget } from '@/utils/dynamic'

export default function CreateMeshPoint() {
  return (
    <div className="flex flex-col items-center gap-6 px-5 py-10 sm:px-10">
      <p className="subtitle-1 text-center text-primary-700">
        您尚未新增/連結錢包。點擊下方按鈕成功建立錢包，即可獲得 100 讀選點數！
      </p>
      <div className="w-full max-w-[320px]">
        <DynamicWidget
          buttonClassName=""
          buttonContainerClassName=""
          innerButtonComponent={
            <>
              <div className="flex flex-row items-center">
                <Icon iconName="icon-dynamicxyz" size="m" />
                <span>以Dynamic繼續</span>
              </div>
            </>
          }
        />
      </div>
      <p className="footnote text-primary-400">
        讀選點數是什麼？
        <Link href={'/'}>
          <span className="text-primary-700 underline underline-offset-2">
            了解更多
          </span>
        </Link>
      </p>
    </div>
  )
}
