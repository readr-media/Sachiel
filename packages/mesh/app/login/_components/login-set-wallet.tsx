import { LogInCard } from '@/components/alchemy/login-card'

export default function LoginSetWallet() {
  return (
    <LogInCard
      formDescription="新增/連結錢包即可獲得 100 讀選點數。點擊下方按鈕立刻建立錢包！"
      isHelperText={true}
    />
  )
}
