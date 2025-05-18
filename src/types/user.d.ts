interface BaseProfile {
  name: string
  nickname: string
  curriculum: string
  jobInterest: string[]
  techStack: string[]
  profileImageUrl?: string | null
}

interface MyProfileData extends BaseProfile {
  email: string
  seatCode: string | null
  interviewCnt: number
}

interface InterviewerData extends BaseProfile {
  seatCode: string
}

type IntervieweeData = BaseProfile

interface ProfileFormData extends BaseProfile {
  seatPosition: {
    section: string | null
    seat: [number | null, number | null]
  }
}
