import { useState } from 'react'
import { generateQuestion, setInterviewTime } from '@/api/interviewAiAPI'
import { updateInterviewStatus } from '@/api/interviewAPI'
import { useAIInterviewStore } from '@/stores'
import { useNavigate } from 'react-router-dom'
import { useTimerStore } from '@/stores/timerStore'

export const useStartInterview = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const setQuestion = useAIInterviewStore(state => state.setQuestion)
  const { startTimer } = useTimerStore()

  const startInterview = async (interviewId: string, duration: number) => {
    setLoading(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await setInterviewTime(interviewId, duration)
    await updateInterviewStatus(interviewId)

    const response = await generateQuestion(interviewId)
    const question = response?.question

    await delay

    if (question) {
      setQuestion(question)
      startTimer(duration)
      navigate('/interview-ai/question')
    }

    setLoading(false)
  }

  return { startInterview, loading }
}
