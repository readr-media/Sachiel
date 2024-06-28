import Button from '@/components/button'
import Icon from '@/components/icon'

import { useLogin } from '../page'
const allCategories = [
  {
    id: '1',
    slug: 'internation',
    title: '國際',
  },
  {
    id: '2',
    slug: 'politics',
    title: '政治',
  },
  {
    id: '3',
    slug: 'society',
    title: '社會',
  },
  {
    id: '4',
    slug: 'finance',
    title: '財經',
  },
  {
    id: '5',
    slug: 'technology',
    title: '科技',
  },
  {
    id: '6',
    slug: 'health',
    title: '醫療健康',
  },
  {
    id: '7',
    slug: 'sport',
    title: '體育',
  },
  {
    id: '8',
    slug: 'art',
    title: '藝文',
  },
  {
    id: '9',
    slug: 'entertainment',
    title: '娛樂',
  },
  {
    id: '10',
    slug: 'life',
    title: '生活',
  },
  {
    id: '11',
    slug: 'education',
    title: '教育',
  },
  {
    id: '12',
    slug: 'environment',
    title: '環境',
  },
]

export default function LoginSetCategory() {
  const { formData, setFormData, setProcess } = useLogin()

  const handleCategoryToggle = (categoryId: string) => {
    const categoryIndex = formData.interests.findIndex(
      (val) => val === categoryId
    )

    const newInterests = [...formData.interests]
    if (categoryIndex === -1) {
      newInterests.push(categoryId)
    } else {
      newInterests.splice(categoryIndex, 1)
    }

    setFormData((prev) => ({
      ...prev,
      interests: newInterests,
    }))
  }

  const handleClickChevron = () => {
    setProcess('set-name')
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
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {allCategories.map((category) => (
                <Button
                  key={category.id}
                  size="md-100"
                  color="white"
                  text={category.title ?? ''}
                  activeState={{
                    isActive: formData.interests.includes(category.id),
                  }}
                  onClick={() => handleCategoryToggle(category.id)}
                />
              ))}
            </div>
          </div>
          <div className="border-t px-5 py-3  sm:px-10 sm:py-5">
            <Button
              size="lg"
              color="primary"
              text={formData.interests.length < 3 ? '至少要選 3 個' : '下一步'}
              onClick={() => setProcess('set-following')}
              disabled={formData.interests.length < 3}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
