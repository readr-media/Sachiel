/**
 * Generate the similiar timestamp format like Mesh app '${DateTime.now()}_$hashCode'
 */
export function generateUniqueTimestamp() {
  const date = new Date()

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const milliseconds = String(date.getMilliseconds()).padStart(6, '0') // Pads to six digits

  const randomDigits = String(Math.floor(Math.random() * 1e8)).padStart(8, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}_${randomDigits}`
}

export function getCurrentTimeInISOFormat() {
  const date = new Date()
  return date.toISOString()
}
