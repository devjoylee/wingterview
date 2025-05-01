import { useState } from 'react'
import { ProfileCard } from '@components/profile'
import styles from './styles.module.scss'

type SeatLocation = {
  section: string | null
  line: number | null
  seat: string | null
}

export const SeatLocationStep = () => {
  const [seatLocation, setSeatLocation] = useState<SeatLocation>({
    section: null,
    line: null,
    seat: null,
  })

  console.log(setSeatLocation)

  return (
    <ProfileCard name="현재 위치 설정">
      <div className={styles.container}>
        <span className={styles.instruction}>
          아래 좌석 배치도 보기 버튼을 눌러 <br />
          본인의 자리를 지정해주세요.
        </span>

        <div className={styles.seatInfoCard}>
          <div className={styles.wrapper}>
            <div className={styles.seatInfo}>
              <span className={styles.value}>
                {seatLocation.section || '?'}
              </span>
              <span className={styles.label}>분단</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.seatInfo}>
              <span className={styles.value}>{seatLocation.line || '?'}</span>
              <span className={styles.label}>번째 줄</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.seatInfo}>
              <span className={styles.value}>{seatLocation.seat || '?'}</span>
              <span className={styles.label}>자리</span>
            </div>
          </div>

          <button className={styles.seatMapButton}>좌석 배치도 보기</button>
        </div>
      </div>
    </ProfileCard>
  )
}
