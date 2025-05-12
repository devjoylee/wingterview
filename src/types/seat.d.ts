interface SeatData {
  section: string | null
  seat: [number | null, number | null]
}

interface SeatParams {
  section: string
  row: number
  col: number
}

interface SeatMapData {
  seats: {
    [section: string]: boolean[][]
  }
  mySeatPosition?: SeatData | null
}
