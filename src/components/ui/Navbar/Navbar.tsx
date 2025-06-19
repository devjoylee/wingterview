import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Zap, BookCheck, MessageSquare, User } from 'lucide-react'
import { useQuizStore } from '@/stores'
import styles from './styles.module.scss'

export const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const currentQuizState = useQuizStore(state => state.currentState)

  useEffect(() => {
    const path = location.pathname

    if (path === '/') {
      setActiveTab('home')
    } else if (path.startsWith('/interview')) {
      setActiveTab('interview')
    } else if (path.startsWith('/quiz')) {
      setActiveTab('quiz')
    } else if (path.includes('board')) {
      setActiveTab('board')
    } else if (path.includes('mypage') || path.includes('profile')) {
      setActiveTab('mypage')
    }
  }, [location.pathname])

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab)
    navigate(path)
  }

  const handleQuizTabClick = () => {
    const path = `/quiz/${currentQuizState}`
    handleTabClick('quiz', path)
  }

  // const handleInterviewTabClick = () => {
  //   const interviewPath = getInterviewRouteByPhase(
  //     currentPhase,
  //     questionOption,
  //     selectedQuestion
  //   )
  //   handleTabClick('interview', interviewPath)
  // }

  // const handleAIInterviewTabClick = () => {
  //   const path = getAIInterviewRouteByPhase(currentPhase)
  //   handleTabClick('interview', path)
  // }

  return (
    <div className={styles.navbar} data-id="navbar">
      <div
        className={`${styles.navItem} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => handleTabClick('home', '/')}
      >
        <Home />
        <span>홈</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'interview' ? styles.active : ''}`}
        onClick={() => handleTabClick('interview', '/interview-ai/awaiting')}
      >
        <Zap />
        <span>면접실</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'quiz' ? styles.active : ''}`}
        onClick={handleQuizTabClick}
      >
        <BookCheck />
        <span>윙퀴즈</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'board' ? styles.active : ''}`}
        onClick={() => handleTabClick('board', '/board')}
      >
        <MessageSquare />
        <span>게시판</span>
      </div>
      <div
        className={`${styles.navItem} ${activeTab === 'mypage' ? styles.active : ''}`}
        onClick={() => handleTabClick('mypage', '/mypage')}
      >
        <User />
        <span>내 정보</span>
      </div>
    </div>
  )
}
