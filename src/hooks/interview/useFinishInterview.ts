import { useCallback, useState } from 'react'
import { updateInterviewStatus } from '@/api/interviewAPI'
import { useNavigate } from 'react-router-dom'
import { useAIInterviewStore, useTimerStore } from '@/stores'
import { useMediaRecorder } from './useMediaRecorder'
import { endInterview } from '@/api/interviewAiAPI'

export const useFinishInterview = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)

  const reset = useAIInterviewStore(state => state.resetInterviewData)
  const resetTimer = useTimerStore(state => state.resetTimer)

  const interviewId = useAIInterviewStore(state => state.interviewId)

  const { uploadRecording } = useMediaRecorder()

  const finishInterview = async (interviewId: string) => {
    if (!interviewId) return
    setLoading(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await uploadRecording(interviewId)
    await delay

    await resetInterview()
    resetTimer({ minutes: 0, seconds: 0 })
    navigate('/interview-ai/end')
  }

  const resetInterview = useCallback(async () => {
    if (!interviewId) return

    try {
      await updateInterviewStatus(interviewId) // PROGRESS -> COMPLETE
      await endInterview(interviewId) // DELETE ID
      reset() // DELETE STORE
    } catch (error) {
      console.error('면접 초기화 중 오류 발생:', error)
    }
  }, [reset, interviewId])

  return { finishInterview, resetInterview, loading }
}
