import React from 'react'
import { Outlet } from 'react-router-dom'
import logo from '@assets/logo.png'
import styles from './styles.module.scss'

export const RootLayout: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <div className={styles.desktopView}>
        <div className={styles.container}>
          <img className={styles.logo} src={logo} alt="img" />
          <p className={styles.slogan}>윙터뷰, 면접에 날개를 달자!</p>
        </div>
      </div>
      <main className={styles.mobileView}>
        <Outlet />
      </main>
    </div>
  )
}
