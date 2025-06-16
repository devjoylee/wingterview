interface BaseProfile {
  name: string
  nickname: string
  curriculum: string
  jobInterest: string[]
  techStack: string[]
  profileImageUrl?: string | null
  isKTB: boolean
}

interface MyProfileData extends BaseProfile {
  email: string
  seatCode: string | null
  interviewCnt: number
  isInQueue: boolean
  myId: string
}

interface InterviewerData extends BaseProfile {
  seatCode: string
}

type IntervieweeData = BaseProfile

interface ProfileCardData extends BaseProfile {
  seatCode: string
}

interface ProfileFormData extends BaseProfile {
  profileImageName: string | null
  seatPosition: {
    section: string | null
    seat: [number | null, number | null]
  }
}
