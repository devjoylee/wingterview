import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Modal, GuideBox } from '@/components/common'
import { useInterviewStore, useTimerStore } from '@/stores'
import {
  useGenerateQuestion,
  useUpdateInterviewStatus,
} from '@/hooks/interview'
import styles from './styles.module.scss'

/**
 *   면접 답변 페이지 flow
 *
 *   페이지 렌더링 시,
 *   선택한 질문 캐싱 확인 (route, store)
 *
 *   꼬리질문 만들기 클릭 시,
 *   현재 질문 + 키워드를 문제 생성 API로 전달
 *   questionData: { question: currentQuestion, keywords: keyword }
 *
 *   새로운 질문 만들기 클릭 시,
 *   questionData 전달 X (기본값으로 넘어감)
 *
 *   면접 종료 클릭 시,
 *   상태 업데이트 PROGRESS -> FEEDBACK
 */

export const InterviewAnswerPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isNewQuestion, setIsNewQuestion] = useState(false)

  const { resetTimer } = useTimerStore()
  const { interviewId, questionIdx, selectedQuestion, setInterviewData } =
    useInterviewStore()

  const currentQuestion = location.state?.question || selectedQuestion

  // 질문 생성 버튼 눌렀을 때
  const { mutate: generateQuestions } = useGenerateQuestion({
    onMutate: () => setIsGenerating(true),

    onSuccess: async result => {
      const delay = new Promise(resolve => setTimeout(resolve, 1500))

      await delay // 로딩 모달 창을 위한 1.5초 지연

      if (result.data && result.data.questions) {
        // 새로운 주제로 질문 만들기일 때 selectedQuestion을 초기화
        if (isNewQuestion) setInterviewData({ selectedQuestion: '' })

        setInterviewData({ questionOption: result.data.questions })
        setIsGenerating(false)
        setIsNewQuestion(false)

        navigate('/interview/question', {
          state: {
            questions: result.data.questions,
          },
        })
      }
    },
    onError: () => {
      setIsGenerating(false)
    },
  })

  const { mutate: updateStatus } = useUpdateInterviewStatus({
    onSuccess: () => {
      navigate('/interview/feedback')
    },
  })

  const generateFollowUp = () => {
    generateQuestions({
      interviewId,
      questionData: {
        question: currentQuestion,
        keywords: keyword,
      },
    })
  }

  const generateNew = () => {
    setIsNewQuestion(true)
    generateQuestions({ interviewId })
  }

  const handleEndInterview = () => {
    if (!interviewId) {
      console.error('면접 ID를 찾을 수 없습니다.')
      return
    }

    updateStatus(interviewId) // PROGRESS -> FEEDBACK
    setInterviewData({ currentPhase: 'FEEDBACK' })
    resetTimer({ minutes: 0, seconds: 0 })
  }

  return (
    <div className={styles.container}>
      <div className={styles.notice}>
        <GuideBox>
          <p>
            <b>1. </b> 선택한 질문을 면접자에게 질문해주세요.
            <br />
            <b>2. </b> 면접자의 답변 중 꼬리질문을 하고 싶은 내용이 있다면
            prompt에 주요 키워드를 입력해보세요. <br />
            (prompt 작성은 선택사항입니다.)
            <br />
          </p>
          <p>
            <b> • 꼬리질문 만들기</b>는 현재 질문과 관련된 질문,
            <br />
            <b>새로운 주제로 질문 만들기</b>는 다른 주제로 질문 생성
          </p>
          <p>
            <b>• </b>면접 종료 버튼을 눌러 다음 flow로 넘어가보세요.
          </p>
        </GuideBox>
      </div>

      <div className={styles.question}>
        <h2>Q{questionIdx}.</h2>
        <p>{currentQuestion}</p>
      </div>

      <div className={styles.promptContainer}>
        <h3>Prompt</h3>

        <textarea
          className={styles.textArea}
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder="면접자의 답변 중 꼬리질문을 하고싶은 주제의 키워드를 입력하면
꼬리질문을 생성합니다.    예) staleTime, 캐싱, 상태관리"
          maxLength={200}
        />

        <span className={styles.helperText}>
          *프롬프트는 최대 200자까지 입력 가능합니다.
        </span>

        <div className={styles.buttons}>
          <Button
            text="꼬리 질문 만들기"
            onClick={generateFollowUp}
            disabled={isGenerating}
          />

          <button
            className={styles.regenerateButton}
            onClick={generateNew}
            disabled={isGenerating}
          >
            새로운 주제로 질문 만들기
          </button>

          <button className={styles.temp} onClick={handleEndInterview}>
            면접 종료 (임시)
          </button>
        </div>
      </div>

      <Modal
        isOpen={isGenerating}
        closeOnBgClick={false}
        style="loading"
        message={['질문을 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}
