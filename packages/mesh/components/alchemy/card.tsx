import { type ReactNode } from 'react'

export const Card = ({ children }: { children?: ReactNode }) => (
  <div className="flex max-w-[theme(width.maxMain)] grow justify-center sm:items-center">
    <div className="flex min-w-80 max-w-[480px] flex-row justify-center bg-transparent p-10 sm:rounded-md sm:px-10 sm:drop-shadow">
      {children}
    </div>
  </div>
)
