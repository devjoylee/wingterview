import styles from './styles.module.scss'

interface ButtonProps {
  onClick: () => void
  disabled: boolean
}

export const InterviewStartButton: React.FC<ButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      START
    </button>
  )
}
