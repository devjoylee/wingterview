import { fetchMyProfile } from '@/api/userAPI'
import { useQuery } from '@tanstack/react-query'

export const useMyProfile = () => {
  return useQuery<UserData>({
    queryKey: ['myProfile'],
    queryFn: fetchMyProfile,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })
}
