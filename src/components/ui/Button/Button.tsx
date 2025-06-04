import styles from './styles.module.scss'

interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
  color?: 'black' | 'blue' | 'orange'
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  color = 'black',
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${styles.button} ${styles[color]}`}
  >
    {text}
  </button>
)
