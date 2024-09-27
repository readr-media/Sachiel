import { type ReactNode } from 'react'

export const Card = ({ children }: { children?: ReactNode }) => (
  <div className="flex h-[calc(100vh-123px)] justify-center sm:h-[calc(100vh-424px)] sm:items-center">
    <div className="flex min-w-80 max-w-[480px] flex-row justify-center bg-transparent p-10 sm:rounded-md sm:px-10 sm:drop-shadow">
      {children}
    </div>
  </div>
)
