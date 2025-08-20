'use client'

import { useState } from 'react'

import { DELETION_STEP } from '@/constants/setting'

import Confirmation from './_components/confirmation'
import Failure from './_components/failure'
import Success from './_components/success'

type StepType = typeof DELETION_STEP[keyof typeof DELETION_STEP]

export default function Page() {
  const [deleteStatus, setDeleteStatus] = useState<StepType>(
    DELETION_STEP.PENDING
  )

  return (
    <main className="w-full">
      {deleteStatus === DELETION_STEP.PENDING && (
        <Confirmation setDeleteStatus={setDeleteStatus} />
      )}
      {deleteStatus === DELETION_STEP.SUCCESS && <Success />}
      {deleteStatus === DELETION_STEP.FAILURE && <Failure />}
    </main>
  )
}
