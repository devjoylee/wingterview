import { useState } from 'react'
import { getPresignedURL, uploadFileToS3 } from '@/api/presignedAPI'
import { confirmUploadingFile } from '@/api/interviewAiAPI'

export const useImageUpload = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')

  const uploadImage = async (file: File, filename: string): Promise<void> => {
    try {
      const presignedUrl = await getPresignedURL(filename) // 1. presigned url 요청
      await uploadFileToS3(presignedUrl, file) // 2.전달받은 url에 file 전송
    } catch (error) {
      console.error('S3 이미지 업로드 실패:', error)
      setErrorMessage('프로필 사진 등록에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return { uploadImage, errorMessage }
}

export const useAudioUpload = () => {
  const uploadAudio = async (
    audioBlob: Blob,
    filename: string
  ): Promise<void> => {
    try {
      const file = new File([audioBlob], filename, { type: 'audio/webm' })
      const presignedUrl = await getPresignedURL(filename)
      await uploadFileToS3(presignedUrl, file)
      await confirmUploadingFile(filename)
    } catch (error) {
      console.error('녹음 파일 업로드 실패:', error)
      throw error
    }
  }

  return { uploadAudio }
}
