import { redirect } from 'next/navigation'

import { getCurrentUser } from '../actions/auth'
import DynamicPanel from './_components/dynamic-panel'
import MeshPoint from './_components/mesh-point'

export default async function Page() {
  const user = await getCurrentUser()
  const memberId = user?.memberId
  if (!memberId) redirect('/login')

  const hasDynamicAccount = !!user.wallet

  return (
    <main className="sm:p-5 md:px-[70px] md:py-10 lg:p-10">
      {hasDynamicAccount ? (
        <MeshPoint />
      ) : (
        <DynamicPanel
          description="您尚未新增/連結錢包。點擊下方按鈕成功建立錢包，即可獲得 100 讀選點數！"
          isHelperText={true}
        />
      )}
    </main>
  )
}
