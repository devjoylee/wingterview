import { useState } from 'react'
import styles from './styles.module.scss'
import bulbImage from '@assets/bulb.png'
import { Button, LoginButton, Modal } from '@/components/ui'
import { getQuizList } from '@/api/quizAPI'
import { useAuthStore, useQuizStore } from '@/stores'
import { DUMMY_QUIZZES } from '@/constants/quizzes'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '@/hooks'
import { ChevronRight } from 'lucide-react'

export const QuizAwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const [loginModal, setLoginModal] = useState(false)
  const [notFoundModal, setNotFoundModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const userId = useAuthStore(state => state.userId)
  const setIsTrial = useQuizStore(state => state.setIsTrial)
  const setQuizzes = useQuizStore(state => state.setQuizzes)
  const setCurrentState = useQuizStore(state => state.setCurrentState)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  const { myData } = useProfile('get')

  const setDummyQuizzes = () => {
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
  }

  const handleStartQuiz = async () => {
    if (!isLoggedIn) {
      setLoginModal(true)
      return
    }

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    try {
      if (userId) {
        const quizzes = await getQuizList(userId)

        if (!quizzes.length) {
          setNotFoundModal(true)
        } else {
          setIsGenerating(true)
          setQuizzes(quizzes)
          setCurrentState('progress')
          navigate('/quiz/progress')
        }
      }
    } catch (error) {
      console.log(error)
      setNotFoundModal(true)
    }

    await delay
  }

  const trial = async () => {
    setIsGenerating(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await delay

    setIsTrial(true)
    setDummyQuizzes()
    setCurrentState('progress')
    navigate('/quiz/progress')
  }

  return (
    <div className={styles.awaitingPage}>
      <div className={styles.container}>
        <div className={styles.guideBoard}>
          <img src={bulbImage} alt="" className={styles.bulbImage} />

          <div className={styles.guideText}>
            <h3>You Quiz ? Wing Quiz ! </h3>
            <p>
              내 개발 지식은 어느 정도일까? <br />
              <b>윙퀴즈</b>와 함께 실력을 테스트해봐요!
            </p>
          </div>

          <div className={styles.reviewQuizButton} onClick={handleStartQuiz}>
            <div className={styles.text}>
              <p>모의면접 복습 퀴즈 </p>
              <span>
                Mr.윙과 진행한 모의면접을 <br />
                퀴즈로 복습해보세요
              </span>
            </div>
            <ChevronRight size={30} className={styles.icon} />
          </div>

          <div className={styles.trial}>
            <p>윙퀴즈가 궁금하신가요? </p>
            <button onClick={trial}>윙퀴즈 체험하기</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={loginModal}
        style="failed"
        message={['로그인 후 이용가능합니다.']}
        closable
        toggleModal={() => setLoginModal(!loginModal)}
      >
        <LoginButton />
      </Modal>

      <Modal
        isOpen={notFoundModal}
        style="failed"
        message={[
          '모의 면접 데이터를 찾을 수 없습니다.',
          '면접을 먼저 진행해 주세요.',
        ]}
        closable
        toggleModal={() => setNotFoundModal(!notFoundModal)}
      >
        <Button
          text="모의 면접 하러가기"
          onClick={() => navigate('/interview-ai/awaiting')}
        />
      </Modal>

      <Modal
        isOpen={isGenerating && !notFoundModal}
        style="loading"
        message={['퀴즈를 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}
