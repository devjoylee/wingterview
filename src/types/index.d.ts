interface Seat {
  section: string | null
  line: string | null
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
