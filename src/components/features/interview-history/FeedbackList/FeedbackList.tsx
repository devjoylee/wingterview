import { FeedbackCard } from '../FeedbackCard/FeedbackCard'
import styles from './styles.module.scss'

interface Props {
  list: FeedbackData[]
}

export const FeedbackList: React.FC<Props> = ({ list }) => {
  return (
    <div className={styles.feedbackList}>
      {list.map((feedback, idx) => (
        <FeedbackCard feedback={feedback} key={idx} idx={idx} />
      ))}
    </div>
  )
}
