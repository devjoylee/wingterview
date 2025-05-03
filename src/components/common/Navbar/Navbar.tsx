import { useState } from 'react'
import { Home, Zap, BookCheck, MessageSquare, User } from 'lucide-react'
import styles from './styles.module.scss'

export const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home')

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
  }

  return (
    <div className={styles.navbar}>
      <div
        className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => handleTabClick('home')}
      >
        <Home />
        <span>매칭 홈</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'interview' ? styles.active : ''}`}
        onClick={() => handleTabClick('interview')}
      >
        <Zap />
        <span>면접실</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'quiz' ? styles.active : ''}`}
        onClick={() => handleTabClick('quiz')}
      >
        <BookCheck />
        <span>오늘의 퀴즈</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'chat' ? styles.active : ''}`}
        onClick={() => handleTabClick('chat')}
      >
        <MessageSquare />
        <span>채팅</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'mypage' ? styles.active : ''}`}
        onClick={() => handleTabClick('mypage')}
      >
        <User />
        <span>내 정보</span>
      </div>
    </div>
  )
}
