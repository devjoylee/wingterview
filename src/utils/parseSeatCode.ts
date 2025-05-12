export const parseSeatCode = (seatCode: string) => {
  if (!seatCode) return null

  // seatCode 예시 : A-12-M
  const [section, row, colPosition] = seatCode.split('-')

  const col: Record<string, number> = {
    L: 1,
    M: 2,
    R: 3,
  }

  console.log(section, parseInt(row, 10), col[colPosition])
  return {
    section,
    row: parseInt(row, 10),
    col: col[colPosition],
  }
}
