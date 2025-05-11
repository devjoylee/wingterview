import { useQuery } from '@tanstack/react-query'
import { checkSeatOccupied, fetchSeatMapData } from '@/api/seatAPI'

export const useSeatMapData = () => {
  return useQuery({
    queryKey: ['seats'],
    queryFn: fetchSeatMapData,
    staleTime: 1000 * 60 * 1,
  })
}

export const useCheckSeatState = (seatId: string) => {
  return useQuery<boolean>({
    queryKey: ['seatOccupied', seatId],
    queryFn: () => checkSeatOccupied(seatId),
    staleTime: 1000 * 60 * 1,
    enabled: !!seatId,
  })
}
