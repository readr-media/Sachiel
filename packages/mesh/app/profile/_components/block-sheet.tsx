import React from 'react'

import Button from '@/components/button'
type BlockSheetType = {
  onClose: () => void
  customId: string
}
const BlockSheet = ({ onClose, customId }: BlockSheetType) => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-lightbox-dark">
      <div className="flex max-w-[278px] flex-col rounded-md bg-white px-5 py-4">
        <section className="mb-5">
          <p className="title-2">封鎖 {customId}？</p>
          <p className="body-3">
            你將再也不會看到對方的精選新聞、集錦、留言等動態及相關通知。如果你有追蹤對方，封鎖對方的同時也會取消追蹤。
          </p>
        </section>
        <section className="flex justify-end">
          {/* TODO: report function not yet */}
          <Button
            size="sm"
            color="transparent-blue"
            text="好的"
            onClick={onClose}
          />
          <Button size="sm" color="custom-blue" text="取消" onClick={onClose} />
        </section>
      </div>
    </div>
  )
}

export default BlockSheet
