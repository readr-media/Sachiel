'use client'

import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type TestVersion = 'A' | 'B' | null

const ABTestContext = createContext<{ version: TestVersion } | undefined>(
  undefined
)

export function ABTestProvider({ children }: { children: ReactNode }) {
  const [testVersion, setTestVersion] = useState<TestVersion>(null)
  console.log(testVersion)
  useEffect(() => {
    setTestVersion(Math.random() < 0.5 ? 'A' : 'B')
  }, [])

  return (
    <ABTestContext.Provider value={{ version: testVersion }}>
      {children}
    </ABTestContext.Provider>
  )
}

export function useABTest() {
  const context = useContext(ABTestContext)
  if (context === undefined) {
    throw new Error('useABTest must be used within a ABTestProvider')
  }
  return context
}
