import { useEffect, useState } from 'react'

function useFormattedDate(date: string): string | null {
  const [formattedDate, setFormattedDate] = useState<string | null>(null)

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, '0')
  }

  useEffect(() => {
    if (!date) return
    const newDate = new Date(date)
    const currentDate = new Date()
    let dateString

    switch (newDate.getFullYear()) {
      case currentDate.getFullYear():
        dateString = `${padTo2Digits(newDate.getMonth() + 1)}/${padTo2Digits(
          newDate.getDate()
        )}`
        break
      default:
        dateString = `${newDate.getFullYear()}/${padTo2Digits(
          newDate.getMonth() + 1
        )}/${padTo2Digits(newDate.getDate())}`
    }

    setFormattedDate(dateString)
  }, [date])

  return formattedDate
}

export default useFormattedDate
