interface BaseProfile {
  name: string
  nickname: string
  curriculum: string
  jobInterest: string[]
  techStack: string[]
}

interface ProfileForm extends BaseProfile {
  profileImageUrl: string | null
  seatPosition: [number, number]
}

interface UserData extends BaseProfile {
  email?: string
  seatCode?: string
  interviewCnt?: number
  profileImage?: File
}
