import { useState } from 'react'
import { generateQuestion, setInterviewTime } from '@/api/interviewAiAPI'
import { updateInterviewStatus } from '@/api/interviewAPI'
import { useAIInterviewStore } from '@/stores'

export const useStartInterview = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const setQuestion = useAIInterviewStore(state => state.setQuestion)

  const startInterview = async (interviewId: string, selectedTime: number) => {
    setLoading(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await setInterviewTime(interviewId, selectedTime)
    await updateInterviewStatus(interviewId)

    const response = await generateQuestion(interviewId)
    const question = response?.question

    if (question) setQuestion(question)

    await delay

    setLoading(false)
  }

  return { startInterview, loading }
}
