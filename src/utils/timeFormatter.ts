export const timeFormatter = (
  seconds: number,
  type?: 'default' | 'kor'
): string => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60

  if (type === 'kor') {
    if (min === 0) return `${sec}초`
    if (sec === 0) return `${min}분`
    return `${min}분 ${sec}초`
  }

  return `${min}:${sec.toString().padStart(2, '0')}`
}
