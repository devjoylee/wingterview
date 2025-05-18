import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './styles.module.scss'
import { Button, Logo, Modal, ProfileCard } from '@/components/common'
import { useApplicantCount, useMatchResult, useMatchStart } from '@/hooks/match'
import { useMatchStore } from '@/stores/matchStore'
import { useMyProfile } from '@/hooks/profile'

export const HomePage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [profile, setMyProfile] = useState<MyProfileData>()
  const { isMatching, setIsMatching, setMatchResultInStore } = useMatchStore()

  const { data: myData } = useMyProfile()
  const { data: applicantCount } = useApplicantCount()
  const { data: matchResult } = useMatchResult(isMatching)
  const { mutate: startMatching, isPending: isButtonClicked } = useMatchStart()

  const handleMatchStart = useCallback(() => {
    if (isButtonClicked) {
      console.log('이미 매칭이 진행 중 입니다.')
      return
    }

    // matchResult == 400 error 매칭전
    // matchResult == null 매칭중
    // matchResult == data 매칭완료

    setIsMatching(true)
    setTimeout(() => {
      startMatching()
    }, 1500)
  }, [isButtonClicked, startMatching, setIsMatching])

  useEffect(() => {
    // 1. navigate state 데이터 확인
    if (location.state?.myProfile) {
      setMyProfile(location.state.myProfile)
      return
    }

    // 2. API 데이터 확인
    if (myData) {
      setMyProfile(myData)
      return
    }
  }, [location.state, myData])

  useEffect(() => {
    if (matchResult) {
      if (matchResult.data === null) {
        // 매칭 중
        setIsMatching(true)
      } else {
        // 이미 매칭되서 결과가 있으면
        setMatchResultInStore(matchResult.data)
        setIsMatching(false)
        navigate('/match/result', { state: { matchResult: matchResult.data } }) // 결과 페이지로 .
      }
    }
  }, [matchResult, navigate, setMatchResultInStore, setIsMatching])

  return (
    <div className={styles.homePage}>
      <div className={styles.pageHeader}>
        <Logo width={60} color="light" />
        <h1>
          모의 면접 D-day,
          <br />
          오늘의 파트너는 누가 될까요?
        </h1>
      </div>

      <div className={styles.pageContent}>
        {profile && <ProfileCard profile={profile} />}

        <div className={styles.matchingState}>
          <Button onClick={handleMatchStart} text="1:1 매칭 시작하기" />
        </div>

        <p className={styles.applicantCount}>
          현재 매칭 신청자 수는 <span>{applicantCount}</span> 명입니다.
          <br />
          매칭 신청을 통해 오늘의 면접 상대를 만나보세요!
        </p>
      </div>

      <Modal
        isOpen={isMatching}
        closeOnBgClick={false}
        style="loading"
        message={['모의 면접 매칭을 진행 중 입니다.', '잠시만 기다려주세요.']}
      />
    </div>
  )
}
