interface Seat {
  section: string | null
  line: number | null
  seat: string | null
}

interface UserProfile {
  name: string
  nickname: string
  curriculum: string
  jobInterest: string[]
  techStack: string[]
  profileImageUrl: string | null
  seatPosition: [number, number]
}

interface ApiResponse<T = null> {
  message: string
  data: T
}
