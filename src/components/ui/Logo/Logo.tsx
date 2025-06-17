import logo from '@assets/logo.png'
import logoWhite from '@assets/logo-white.png'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'

interface LogoProps {
  width?: number
  white?: boolean
}

export const Logo: React.FC<LogoProps> = ({ width = 150, white }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.logo} data-id="logo">
      <img
        src={white ? logoWhite : logo}
        alt="logo"
        style={{ width: width }}
        onClick={() => navigate('/')}
      />
    </div>
  )
}
