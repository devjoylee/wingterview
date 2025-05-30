import { useState } from 'react'
import { useAIInterviewStore } from '@/stores'
import { generateQuestion } from '@/api/interviewAiAPI'

export const useNextQuestion = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const setQuestion = useAIInterviewStore(state => state.setQuestion)

  const nextQuestion = async (
    interviewId: string,
    questionData?: { question: string; keywords: string }
  ) => {
    setLoading(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    const response = await generateQuestion(interviewId, questionData)
    const question = response.data?.question

    if (question) setQuestion(question)

    await delay

    setLoading(false)
  }

  return { nextQuestion, loading }
}
