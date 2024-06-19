import Image from 'next/image'

export default function NoFollowings() {
  return (
    <main className="flex justify-center gap-10 bg-white p-5 sm:bg-gray-50">
      <div className="flex w-full justify-center bg-white sm:max-w-[600px] sm:rounded-md sm:px-10 sm:py-15 sm:drop-shadow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-6">
            <Image
              src={`/icons/icon-user-dash.svg`}
              width={80}
              height={78}
              alt={'icon-user-dash'}
            />
            <div className="flex flex-col items-center gap-2">
              <p className="title-1 text-primary-700">
                咦？這裡好像還缺點什麼...
              </p>
              <div className="flex flex-col items-center">
                <p className="body-2 text-primary-500">追蹤您喜愛的人</p>
                <p className="body-2 text-primary-500">
                  看看他們都精選了什麼新聞 👀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
