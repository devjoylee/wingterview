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

export const fetchApplicantCount = async () => {
  try {
    const response = await apiClient.get<ApiResponse<{ count: number }>>(
      '/matching/statistics'
    )
    console.log('🎉 면접 신청자 수 조회 성공:', response.data.data.count)
    return response.data.data.count
  } catch (error) {
    console.error('면접 신청자 수 조회 실패:', error)
    throw error
  }
}
