import { useState } from 'react'
import { Button } from '@/components/ui'
import mrWing from '@/assets/mrwing.png'
import styles from './styles.module.scss'

interface Props {
  onPrev: () => void
  startInterview: () => void
}

export const InterviewMicTest: React.FC<Props> = ({
  onPrev,
  startInterview,
}) => {
  const [permission, setPermission] = useState(false)

  const handleBack = () => {
    onPrev()
  }

  const handleStart = () => {
    startInterview()
    setPermission(true)
  }

  return (
    <div className={styles.container}>
      <img src={mrWing} alt="mr wing" className={styles.mrwing} />

      <h3>마이크 테스트</h3>
      <p>마이크가 정상적으로 작동하는지 확인해주세요.</p>

      <div className={styles.micTest}>
        {!permission && (
          <p className={styles.error}>
            마이크에 접근할 수 없습니다. <br />
            브라우저 설정에서 마이크 권한을 허용해주세요.
          </p>
        )}

        {permission && <div>오디오 컨트롤러</div>}
      </div>

      <div className={styles.buttons}>
        <Button text="이전" onClick={handleBack} color="black" />
        <Button
          text="녹음 실행 및 면접 시작"
          onClick={handleStart}
          disabled={!permission}
        />
      </div>
    </div>
  )
}
