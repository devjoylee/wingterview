import apiClient from '@/api/apiClient'
import { API } from './endpoints'
import { errorHandler } from '@/utils/errorHandler'

export const getBoardList = async (
  orderBy: string = 'latest',
  limit: number = 10,
  cursor?: string
) => {
  try {
    const response = await apiClient.get<ApiResponse<BoardListResponse>>(
      API.BOARD.LIST(orderBy, limit, cursor)
    )
    console.log('🎉 게시판 리스트 조회 성공:', response.data)
    return response.data.data
  } catch (error) {
    console.error('게시판 리스트 조회 실패:', error)
    throw error
  }
}

export const getBoardDetail = async (boardId: string) => {
  try {
    const response = await apiClient.get<ApiResponse<BoardDetailData>>(
      API.BOARD.DETAIL(boardId)
    )
    console.log('🎉 게시판 상세 조회 성공:', response.data)
    return response.data.data
  } catch (error) {
    errorHandler(error)
    return null
  }
}

export const shareFeedback = async (segmentId: string, comment: string) => {
  try {
    const response = await apiClient.post<ApiResponse<{ boardId: string }>>(
      API.BOARD.SHARE(segmentId),
      { comment }
    )
    console.log('🎉 면접 피드백 공유 성공:', response.data)
    return response.data.data
  } catch (error) {
    console.error('면접 피드백 공유 실패:', error)
    errorHandler(error)
    throw error
  }
}
