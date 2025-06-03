import { useState } from 'react'
import styles from './styles.module.scss'
import quizIcon from '@assets/quiz.png'
import { Button, Modal } from '@/components/ui'
import { QuizTypeSelection } from '@/components/features'

export const QuizAwaitingPage: React.FC = () => {
  const [toggleModal, setToggleModal] = useState(false)

  const handleStartQuiz = () => {
    setToggleModal(true)
  }

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

          <QuizTypeSelection />

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
    </div>
  )
}
