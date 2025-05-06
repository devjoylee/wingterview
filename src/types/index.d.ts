interface SeatData {
  section: string | null
  seat: [number | null, number | null]
}

interface SeatParams {
  section: string
  row: number
  col: number
}

interface UserProfile {
  name: string
  nickname: string
  curriculum: string
  jobInterest: string[]
  techStack: string[]
  profileImageUrl: string | null
  seatPosition: SeatData
}

interface ApiResponse<T = null> {
  message: string
  data: T
}
