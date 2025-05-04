interface Seat {
  section: string | null
  seat: [number | null, number | null]
}

interface UserProfile {
  name: string
  nickname: string
  curriculum: string
  jobInterest: string[]
  techStack: string[]
  profileImageUrl: string | null
  seatPosition: Seat
}

interface ApiResponse<T = null> {
  message: string
  data: T
}
