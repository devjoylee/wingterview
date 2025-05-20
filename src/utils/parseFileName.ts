export const parseFileName = (file: File): string => {
  if (!file) return ''

  const lastDotIndex = file.name.lastIndexOf('.')

  const filename = file.name.substring(0, lastDotIndex)
  const type = file.name.substring(lastDotIndex + 1).toLowerCase()

  return `${filename}_${Date.now()}.${type}`
}
