import loadingGif from '@assets/loading.gif'
import styles from './styles.module.scss'

interface Props {
  size?: number
  text?: string
}

export const LoadingIndicator: React.FC<Props> = ({ size = 80, text }) => {
  return (
    <div className={styles.loading}>
      <img
        src={loadingGif}
        alt="loading"
        style={{ width: size, height: size }}
      />
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  )
}
