import { InterviewHistoryCard } from '@/components/features'
import styles from './styles.module.scss'

interface Props {
  history: InterviewHistoryListData[]
}

export const InterviewHistoryList: React.FC<Props> = ({ history }) => {
  return (
    <div className={styles.historyList}>
      {history.map((list, index) => (
        <InterviewHistoryCard key={index} list={list} />
      ))}
    </div>
  )
}
