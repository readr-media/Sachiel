import Button from '@/components/button'
import Icon from '@/components/icon'

import type { LoginProcess, UserFormData } from '../page'

const categoryTitle = [
  '國際',
  '政治',
  '社會',
  '經濟/財經',
  '科技',
  '醫療健康',
  '體育',
  '藝文',
  '娛樂',
  '生活/風尚',
  '教育',
  '環境/氣候',
]

export default function LoginSetCategory({
  handleLoginProcess,
  setFormData,
}: {
  handleLoginProcess: (step: LoginProcess) => void
  setFormData: React.Dispatch<React.SetStateAction<UserFormData>>
}) {
  const handleClickChevron = () => {
    handleLoginProcess('set-name')
  }

  return (
    <div className="flex h-full flex-col items-center bg-white sm:bg-gray-50">
      <div className="flex h-15 w-full flex-row items-center border-b sm:hidden">
        <button onClick={handleClickChevron}>
          <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
        </button>
        <h2 className="list-title mx-auto">新聞類別</h2>
        <div className="h-5 w-5 px-5"></div>
      </div>
      <div className="flex w-full justify-center sm:h-full sm:items-center">
        <div className="flex max-w-[480px] flex-col bg-white sm:rounded-md sm:drop-shadow">
          <div className="hidden h-15 w-full items-center justify-center border-b sm:flex">
            <button onClick={handleClickChevron}>
              <Icon iconName="icon-chevron-left" size="m" className="ml-5" />
            </button>
            <h2 className="list-title mx-auto">新聞類別</h2>
            <div className="h-5 w-5 px-5"></div>
          </div>
          <div className="flex flex-col items-center gap-5 p-5">
            <Icon
              iconName="icon-login-step-2"
              size={{ width: 335, height: 20 }}
            />
            <p className="subtitle-1 text-center text-primary-500">
              請選擇您想追蹤的新聞類別
            </p>
            <div className="flex flex-wrap gap-3">
              {categoryTitle.map((item, idx) => (
                <div key={idx}>
                  <Button
                    size="xs"
                    color="white"
                    text={item}
                    onClick={() => console.log(item)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="border-t px-5 py-3  sm:px-10 sm:py-5">
            <Button
              size="lg"
              color="primary"
              text="下一步"
              onClick={() => handleLoginProcess('set-following')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
