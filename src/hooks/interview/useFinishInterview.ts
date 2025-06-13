import { useState } from 'react'
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

  const { uploadRecording, stopRecording } = useMediaRecorder()

  const finishInterview = async (interviewId: string) => {
    if (!interviewId) return
    setLoading(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1000))

    await updateInterviewStatus(interviewId)
    stopRecording()
    await delay

    resetTimer({ minutes: 0, seconds: 0 })
    navigate('/interview-ai/end')
  }

  const saveInterview = async (interviewId: string) => {
    if (!interviewId) return
    setLoading(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await uploadRecording(interviewId)
    await resetInterview(interviewId)
    await delay
    setLoading(false)
  }

  const resetInterview = async (interviewId: string) => {
    if (!interviewId) return

    try {
      await updateInterviewStatus(interviewId) // PROGRESS -> COMPLETE
      await endInterview(interviewId) // DELETE ID
      reset() // DELETE STORE
    } catch (error) {
      console.error('면접 초기화 중 오류 발생:', error)
    }
  }

  return { finishInterview, saveInterview, resetInterview, loading }
}
