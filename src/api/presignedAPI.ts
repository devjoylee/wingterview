import axios from 'axios'
import apiClient from '@/api/apiClient'
import { API } from './endpoints'

// S3에 직접 파일을 업로드하는 함수 (presigned URL 사용)
export const uploadFileToS3 = async (presignedUrl: string, file: File) => {
  try {
    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
      },
      withCredentials: false,
    })

    return response
  } catch (error) {
    console.error('S3 파일 업로드 실패:', error)
    throw error
  }
}

// 서버에 presignt url 을 요청하는 함수
export const getPresignedURL = async (filename?: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{ url: string }>>(
      API.PRESIGNED_URL(filename)
    )
    return response.data.data.url
  } catch (error) {
    console.error(`${filename ? '파일' : 'Presigned'} URL 조회 실패:`, error)
    throw error
  }
}
