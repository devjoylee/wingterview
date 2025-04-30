import loadingGif from '@assets/loading.gif'
import styles from './styles.module.scss'

export const LoadingIndicator: React.FC = () => {
  return (
    <div className={styles.loading}>
      <img src={loadingGif} alt="loading" />
    </div>
  )
}
