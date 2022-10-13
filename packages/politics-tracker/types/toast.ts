export type CloseFuction = () => void

export type ToastData = {
  id?: string
  status: 'success' | 'fail'
  title: string
  desc: string
}

export type ToastContextValue = {
  open: (props: ToastData) => void
}
