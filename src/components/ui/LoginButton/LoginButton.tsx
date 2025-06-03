import { useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'

export const LoginButton: React.FC = () => {
  const navigate = useNavigate()

  return (
    <button className={styles.loginButton} onClick={() => navigate('/login')}>
      로그인하러 가기
    </button>
  )
}
