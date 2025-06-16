import { useState, useEffect } from 'react'
import { useProfileStore } from '@/stores'
import type { Swiper as SwiperType } from 'swiper'
import styles from './styles.module.scss'

interface SliderButtonProps {
  handleSubmit: () => void
  swiper: SwiperType | undefined
}

export const SliderButtons: React.FC<SliderButtonProps> = ({
  handleSubmit,
  swiper,
}) => {
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const { validateCurrentStep, currentStep } = useProfileStore()

  const handlePrev = () => {
    if (swiper) swiper.slidePrev()
  }

  const handleNext = () => {
    const isValid = validateCurrentStep(currentStep)
    if (isValid && swiper) swiper.slideNext()
  }

  useEffect(() => {
    if (!swiper) return

    const updateState = () => {
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
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
  }, [swiper, currentStep])

  return (
    <div className={styles.sliderBtns}>
      <button onClick={handlePrev} disabled={isBeginning}>
        이전
      </button>

      {!isEnd ? (
        <button onClick={handleNext} disabled={isEnd}>
          다음
        </button>
      ) : (
        <button className={styles.submit} onClick={handleSubmit}>
          제출하기
        </button>
      )}
    </div>
  )
}
