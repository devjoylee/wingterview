import { errorMessages } from '@/constants/errorMessages'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (error: any) => {
  const status = error.response?.status
  const message = error.response?.data?.message

  if (status === 400 || status === 404 || status === 409 || status === 410) {
    if (errorMessages[message]) {
      const errorMessage = errorMessages[message]
      console.warn(errorMessage)
      return true
    }
  }
  return false
}
