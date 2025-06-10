import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import quizIcon from '@assets/quiz.png'
import { Button, Modal } from '@/components/ui'
import { QuizTypeSelection } from '@/components/features'
// import { getQuizList } from '@/api/quizAPI'
import { useQuizStore } from '@/stores'
import { DUMMY_QUIZZES } from '@/constants/quizzes'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '@/hooks'

export const QuizAwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const [toggleModal, setToggleModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const setQuizzes = useQuizStore(state => state.setQuizzes)
  const setCurrentState = useQuizStore(state => state.setCurrentState)

  const { myData } = useProfile('get')

  const handleStartQuiz = async () => {
    setIsGenerating(true)
    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await delay // 로딩 모달 창을 위한 1.5초 지연

    // try {
    //   const quizzes = await getQuizList()
    //   setQuizzes(quizzes)
    // } catch (error) {
    //   console.error('더미 퀴즈 데이터 사용:', error)
    //   setQuizzes(DUMMY_QUIZZES)
    // }

    setIsGenerating(false)
    setCurrentState('progress')
    navigate('/quiz/progress')
  }

  useEffect(() => {
    switch (myData?.curriculum) {
      case '풀스택':
        setQuizzes(DUMMY_QUIZZES.fullstack)
        return
      case '클라우드':
        setQuizzes(DUMMY_QUIZZES.cloud)
        return
      case '인공지능':
        setQuizzes(DUMMY_QUIZZES.ai)
        return
      default:
        setQuizzes(DUMMY_QUIZZES.fullstack)
        return
    }
  }, [myData, setQuizzes])

  return (
    <div className={styles.awaitingPage}>
      <div className={styles.container}>
        <div className={styles.guideBoard}>
          <img src={quizIcon} alt="" className={styles.quizIcon} />

          <div className={styles.guideText}>
            <h3>You Quiz ? Wing Quiz ! </h3>
            <p>
              내 개발 지식은 어느 정도일까? <br />
              <b>윙퀴즈</b>와 함께 실력을 테스트해봐요!
            </p>
          </div>

          <QuizTypeSelection onClick={() => setToggleModal(true)} />

          <div className={styles.startButton}>
            <Button
              text="퀴즈 시작하기"
              onClick={handleStartQuiz}
              color="orange"
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={toggleModal}
        style="failed"
        message={['서비스 준비 중 입니다.', '조금만 기다려주세요!']}
        closable
        toggleModal={() => setToggleModal(!toggleModal)}
      />

      <Modal
        isOpen={isGenerating}
        style="loading"
        message={['퀴즈를 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}
