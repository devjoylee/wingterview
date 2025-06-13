export const dateFormatter = (isoDateString: string): string => {
  const date = new Date(isoDateString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}년 ${month}월 ${day}일`
}
