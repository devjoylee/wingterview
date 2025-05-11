interface BaseProfile {
  name: string
  nickname: string
  curriculum: string
  jobInterest: string[]
  techStack: string[]
  profileImageUrl?: string
}

interface ProfileFormData extends BaseProfile {
  seatPosition: {
    section: string | null
    seat: [number | null, number | null]
  }
}

interface UserData extends BaseProfile {
  email?: string
  seatCode?: string
  interviewCnt?: number
}
