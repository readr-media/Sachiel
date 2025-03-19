export const displayTime = (date: string | Date) => {
  if (!date) return
  const targetDate = new Date(date)
  const year = targetDate.getFullYear()
  const month = String(targetDate.getMonth() + 1).padStart(2, '0')
  const day = String(targetDate.getDate()).padStart(2, '0')
  const hour = String(targetDate.getHours()).padStart(2, '0')
  const second = String(targetDate.getMinutes()).padStart(2, '0')

  return `${year}/${month}/${day} ${hour}:${second}`
}

export const formatAudioTime = (seconds: number): string => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const secs = String(Math.floor(seconds % 60)).padStart(2, '0')

  return `${hours}:${minutes}:${secs}`
}
