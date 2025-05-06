interface SeatData {
  section: string | null
  seat: [number | null, number | null]
}

interface SeatParams {
  section: string
  row: number
  col: number
}

interface ApiResponse<T = null> {
  message: string
  data: T
}
