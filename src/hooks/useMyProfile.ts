import { fetchMyProfile } from '@/api/userAPI'
import { useQuery } from '@tanstack/react-query'

const myDummyProfile: UserData = {
  nickname: 'joy.lee',
  name: '이주영',
  curriculum: '풀스택',
  seatCode: 'A-03-M',
  jobInterest: ['프론트엔드 개발자', '백엔드 개발자', '풀스택 개발자'],
  techStack: ['React', 'TypeScript', 'Python'],
  interviewCnt: 4,
  profileImage: undefined,
}

export const useMyProfile = () => {
  return useQuery<UserData>({
    queryKey: ['myProfile'],
    queryFn: fetchMyProfile,
    initialData: myDummyProfile,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
