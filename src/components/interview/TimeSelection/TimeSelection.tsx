import styles from './styles.module.scss'
import { useAIInterviewStore } from '@/stores'

export const TimeSelection: React.FC = () => {
  const selected = useAIInterviewStore(state => state.duration)
  const setSelected = useAIInterviewStore(state => state.setDuration)

  return (
    <ul className={styles.timeSelection}>
      {[5, 10, 15, 20].map(time => (
        <li
          key={time}
          className={time === selected ? styles.active : ''}
          onClick={() => setSelected(time)}
        >
          {time}분
        </li>
      ))}
    </ul>
  )
}
