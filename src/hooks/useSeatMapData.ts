import { useQuery } from '@tanstack/react-query'
import { fetchSeatMapData } from '@/api/seatAPI'

export const useSeatMapData = () => {
  return useQuery({
    queryKey: ['seats'],
    queryFn: fetchSeatMapData,
  })
}
