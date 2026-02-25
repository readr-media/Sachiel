import type { GetServerSideProps } from 'next'

/**
 * 首頁：導向 2024 選舉政見協作平台
 * 因部分部署環境下 next.config.js 的 rewrite 對根路徑 / 可能不生效，
 * 故以實際頁面做 307 導向，確保 https://2024election.readr.tw/ 可正常顯示。
 */
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/2024',
      permanent: false, // 307，非 301，方便日後若有首頁再改
    },
  }
}

// 不會被渲染，getServerSideProps 會先執行並 redirect
export default function Index(): null {
  return null
}
