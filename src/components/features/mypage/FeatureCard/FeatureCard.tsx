import { Speech, Binary } from 'lucide-react'
import styles from './styles.module.scss'
import { LoginButton, Modal } from '@/components/ui'
import { useState } from 'react'

export const FeatureCard: React.FC<{ linkTo: (link: string) => void }> = ({
  linkTo,
}) => {
  const [toggleModal, setToggleModal] = useState(false)

  return (
    <div className={styles.features}>
      <div className={styles.card} onClick={() => linkTo('/mypage/interview')}>
        <div className={styles.cardName}>
          <Speech size={32} />
          <h3>나의 면접 회고하기</h3>
        </div>
        <p>Mr.윙의 피드백 확인 / 음성 파일 다운로드 / 질문 복습</p>
      </div>

      <div className={styles.card} onClick={() => linkTo('/mypage/quiz')}>
        <div className={styles.cardName}>
          <Binary size={32} />
          <h3>나의 퀴즈 복습하기</h3>
        </div>
        <p>내가 푼 퀴즈 다시보기 / 오답 모아보기</p>
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
    </div>
  )
}
