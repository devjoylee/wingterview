import { useState } from 'react'
import styles from './styles.module.scss'
import bulbImage from '@assets/bulb.png'
import { LoginButton, Modal } from '@/components/ui'
import { getQuizList } from '@/api/quizAPI'
import { useAuthStore, useQuizStore } from '@/stores'
import { DUMMY_QUIZZES } from '@/constants/quizzes'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '@/hooks'
import { ChevronRight } from 'lucide-react'

export const QuizAwaitingPage: React.FC = () => {
  const navigate = useNavigate()
  const [toggleModal, setToggleModal] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const setQuizzes = useQuizStore(state => state.setQuizzes)
  const setCurrentState = useQuizStore(state => state.setCurrentState)
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  const { myData, myId } = useProfile('get', isLoggedIn)

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
      setToggleModal(true)
      return
    }

    setIsGenerating(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await delay

    try {
      if (myId) {
        const quizzes = await getQuizList(myId)
        setQuizzes(quizzes)
      }
    } catch (error) {
      console.log(error)
    }

    setCurrentState('progress')
    navigate('/quiz/progress')
  }

  const trial = async () => {
    setIsGenerating(true)

    const delay = new Promise(resolve => setTimeout(resolve, 1500))

    await delay

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
        isOpen={toggleModal}
        style="failed"
        message={['로그인 후 이용가능합니다.']}
        closable
        toggleModal={() => setToggleModal(!toggleModal)}
      >
        <LoginButton />
      </Modal>

      <Modal
        isOpen={isGenerating}
        style="loading"
        message={['퀴즈를 생성하고 있습니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}
