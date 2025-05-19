import apiClient from '@/api/apiClient'
import { API } from './endpoints'
import axios from 'axios'

export const enqueueMatching = async () => {
  try {
    const response = await apiClient.post<ApiResponse<null>>(API.MATCH.ENQUEUE)
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
      API.MATCH.STAT
    )
    console.log('🎉 매칭 신청자 수 조회 성공:', response.data.data.count)
    return response.data.data.count
  } catch (error) {
    console.error('매칭 신청자 수 조회 실패:', error)
    throw error
  }
}

export const fetchMatchingResult = async () => {
  try {
    const response = await apiClient.get<ApiResponse<MatchResultData | null>>(
      API.MATCH.RESULT
    )
    console.log('🎉 매칭 결과 조회 성공:', response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.data.message !== 'INVALID_USER') throw error
      }
    }
  }
}
