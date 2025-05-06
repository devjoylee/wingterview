import apiClient from '@/api/apiClient'

export const enqueueMatching = async () => {
  try {
    const response =
      await apiClient.post<ApiResponse<null>>('/matching/enqueue')
    console.log('🎉 매칭 큐 진입 성공:', response.data)
    return response.data
  } catch (error) {
    console.error('매칭 큐 진입 실패:', error)
    throw error
  }
}
