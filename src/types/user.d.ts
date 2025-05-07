interface BaseProfile {
  name: string
  nickname: string
  curriculum: string
  jobInterest: string[]
  techStack: string[]
}

interface ProfileFormData extends BaseProfile {
  profileImageUrl: string | null
  seatPosition: {
    section: string | null
    seat: [number | null, number | null]
  }
}

interface UserData extends BaseProfile {
  email?: string
  seatCode?: string
  interviewCnt?: number
  profileImage?: File
}
