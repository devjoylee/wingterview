import { errorMessages } from '@/constants/errorMessages'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (error: any) => {
  const status = error.response?.status
  const message =
    error.response?.data?.message ||
    '문제가 발생했습니다. 잠시 후 다시 시도해주세요.'

  if (status === 400 || status === 404 || status === 409 || status == 410) {
    const errorMessage = errorMessages[message]
    console.warn(errorMessage)
  }
}
