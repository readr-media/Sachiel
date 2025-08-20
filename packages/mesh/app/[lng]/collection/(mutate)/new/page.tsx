'use client'

import DesktopCreateCollection from './_components/desktop/create-collection'
import MobileNewCollection from './_components/mobile/create-collection'

export default function NewCollectionPage() {
  return (
    <main className="flex w-full max-w-[theme(width.maxContent)] grow flex-col">
      <DesktopCreateCollection />
      <MobileNewCollection />
    </main>
  )
}
