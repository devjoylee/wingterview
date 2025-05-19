import { getPresignedURL } from '@/api/presignedAPI'
import { useQuery } from '@tanstack/react-query'

export const usePresignedURL = (filename?: string) => {
  return useQuery<string>({
    queryKey: ['presigned', filename],
    queryFn: () => getPresignedURL(filename),
    enabled: true,
  })
}
