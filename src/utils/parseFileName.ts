export const parseFileName = (file: File) => {
  if (!file) return ''

  const [filename, type] = file.name.split('.')

  return filename + '_' + Date.now() + '.' + type
}
