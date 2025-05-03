import styles from './styles.module.scss'
import { useSwiper } from 'swiper/react'
import { useState, useEffect } from 'react'
import { useProfileStore } from '@/stores/profileStore'
import { submitUserProfile } from '@/api/profileAPI'

export const SliderButtons: React.FC = () => {
  const swiper = useSwiper()
  const { formData } = useProfileStore()
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!swiper) return

    const updateState = () => {
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
      setCurrentStep(swiper.activeIndex)
    }

    updateState()

    swiper.on('slideChange', updateState)
    swiper.on('reachBeginning', updateState)
    swiper.on('reachEnd', updateState)

    return () => {
      swiper.off('slideChange', updateState)
      swiper.off('reachBeginning', updateState)
      swiper.off('reachEnd', updateState)
    }
  }, [swiper])

  const handlePrev = () => swiper.slidePrev()

  const handleNext = () => {
    switch (currentStep) {
      case 0: // 기본 정보
        console.log(
          '기본 정보 유효성 검사 : ',
          formData.name,
          formData.nickname,
          formData.curriculum
        )
        break
      case 1: // 희망 직무
        console.log('희망 직무 유효성 검사 : ', formData.jobInterest)
        break
      case 2: // 기술 스택
        console.log('기술 스택 유효성 검사 : ', formData.techStack)
        break
      case 3: // 프로필 사진
        console.log('프로필 사진 유효성 검사 : ', formData.profileImageUrl)
        break
      case 4: // 좌석 위치
        console.log('좌석 위치 유효성 검사 : ', formData.seatPosition)
        break
      default:
        break
    }

    console.log(formData)

    swiper.slideNext()
  }

  const handleSubmit = async () => {
    console.log('최종 제출 데이터: ', formData)
    try {
      await submitUserProfile(formData)
      localStorage.setItem('form', JSON.stringify(formData))
      console.log('제출 완료! 🎉')
    } catch (error) {
      console.error('제출 실패:', error)
    }
  }

  const isLastStep = currentStep === 5

  return (
    <div className={styles.sliderBtns}>
      <button onClick={handlePrev} disabled={isBeginning}>
        이전
      </button>

      {!isLastStep ? (
        <button onClick={handleNext} disabled={isEnd}>
          다음
        </button>
      ) : (
        <button className={styles.active} onClick={handleSubmit}>
          제출하기
        </button>
      )}
    </div>
  )
}
