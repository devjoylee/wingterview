import styles from './styles.module.scss'
import { useSwiper } from 'swiper/react'
import { useState, useEffect } from 'react'

export const SliderButtons: React.FC = () => {
  const swiper = useSwiper()
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  useEffect(() => {
    if (!swiper) return

    const updateState = () => {
      setIsBeginning(swiper.isBeginning)
      setIsEnd(swiper.isEnd)
    }

    console.log(isBeginning, isEnd)

    updateState()

    swiper.on('slideChange', updateState)
    swiper.on('reachBeginning', updateState)
    swiper.on('reachEnd', updateState)

    return () => {
      swiper.off('slideChange', updateState)
      swiper.off('reachBeginning', updateState)
      swiper.off('reachEnd', updateState)
    }
  }, [swiper, isBeginning, isEnd])

  return (
    <div className={styles.sliderBtns}>
      <button
        className={!isBeginning ? styles.active : ''}
        onClick={() => swiper.slidePrev()}
      >
        이전
      </button>
      <button
        className={!isEnd ? styles.active : ''}
        onClick={() => swiper.slideNext()}
      >
        다음
      </button>
    </div>
  )
}
