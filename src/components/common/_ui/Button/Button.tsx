import styles from './styles.module.scss'

interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className={styles.button}>
    {text}
  </button>
)
