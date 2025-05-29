import { useState } from 'react'
import { generateQuestion, setInterviewTime } from '@/api/interviewAiAPI'
import { updateInterviewStatus } from '@/api/interviewAPI'

export const useStartInterview = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const startInterview = async (interviewId: string, selectedTime: number) => {
    setLoading(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await setInterviewTime(interviewId, selectedTime)
    await updateInterviewStatus(interviewId)
    await generateQuestion(interviewId)
    await delay

    setLoading(false)
  }

  return { startInterview, loading }
}
