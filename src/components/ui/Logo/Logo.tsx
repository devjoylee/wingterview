import logo from '@assets/logo.png'
import logoWhite from '@assets/logo-white.png'
import styles from './styles.module.scss'

interface LogoProps {
  width?: number
  white?: boolean
}

export const Logo: React.FC<LogoProps> = ({ width, white }) => (
  <img
    src={white ? logoWhite : logo}
    alt="logo"
    className={styles.logo}
    style={{ width: width }}
  />
)
