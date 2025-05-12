import styles from './styles.module.scss'
import wingL from '@assets/wing-l.png'
import wingR from '@assets/wing-r.png'

interface CurrentRoundProps {
  currentRound: number
}

export const CurrentRound: React.FC<CurrentRoundProps> = ({ currentRound }) => (
  <div className={styles.round}>
    <img src={wingL} alt="wing" />
    <span>{currentRound} ROUND</span>
    <img src={wingR} alt="wing" />
  </div>
)
