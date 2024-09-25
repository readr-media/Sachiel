import Icon from '@/components/icon'

export default function EmptyMessage() {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="mb-5">
        <Icon iconName="icon-404" size={{ width: 80, height: 80 }} />
      </div>
      <p className="title-1 mb-1 text-primary-700">找不到新聞</p>
      <p className="body-3 text-primary-600">請查看其他分類，或重新整理頁面</p>
    </div>
  )
}
