import type { Info } from '@/types/user-behavior-log'

const sendLog = (log: Info, target: string) => {
  const blob = new Blob([JSON.stringify(log)], {
    type: 'application/json; charset=UTF-8',
  })
  navigator.sendBeacon(target, blob)
}

const sendUserBehaviorLog = (log: Info) => sendLog(log, '/api/tracking')

export { sendUserBehaviorLog }
