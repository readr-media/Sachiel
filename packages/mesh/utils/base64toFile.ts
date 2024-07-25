export default async function base64ToFile(
  base64String: string,
  fileName: string
): Promise<File> {
  const mimeType = base64String.split(';')[0].split(':')[1]
  const byteCharacters = atob(base64String.split(',')[1])
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType })
  return new File([blob], fileName, { type: mimeType })
}
