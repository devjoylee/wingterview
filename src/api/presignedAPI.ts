import axios from 'axios'
import apiClient from '@/api/apiClient'
import { API } from './endpoints'

// S3에 직접 이미지를 업로드하는 함수 (presigned URL 사용)
export const uploadImageToS3 = async (presignedUrl: string, file: File) => {
  try {
    let contentType = 'application/octet-stream'

    if (
      file.type.includes('jpeg') ||
      file.type.includes('jpg') ||
      file.type.includes('png')
    ) {
      contentType = file.type
    }

    const response = await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': contentType,
      },
      withCredentials: false,
    })

    console.log('🎉 S3 이미지 업로드 성공:', response)
    return response
  } catch (error) {
    console.error('S3 이미지 업로드 실패:', error)
    throw error
  }
}

// 서버에 presignt url 을 요청하는 함수
export const getPresignedURL = async (filename?: string) => {
  try {
    const response = await apiClient.get<ApiResponse<{ url: string }>>(
      API.PRESIGNED_URL(filename)
    )
    console.log(
      `🎉 ${filename ? '이미지' : 'Presigned'} URL 조회 성공:`,
      response.data.data
    )
    return response.data.data.url
  } catch (error) {
    console.error(`${filename ? '이미지' : 'Presigned'} URL 조회 실패:`, error)
    throw error
  }
}
