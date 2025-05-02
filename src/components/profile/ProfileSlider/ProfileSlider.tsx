import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { useProfileStore } from '@/stores/profileStore'
import { SliderButtons } from '@components/profile'
import * as S from '@components/profile/_steps'
import styles from './styles.module.scss'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const ProfileSlider: React.FC = () => {
  const { setSwiper, currentStep } = useProfileStore()

  const slides = [
    { id: 1, component: <S.BasicInfoStep /> },
    { id: 2, component: <S.JobInterestStep /> },
    { id: 3, component: <S.TechStackStep /> },
    { id: 4, component: <S.ProfileImageStep /> },
    { id: 5, component: <S.SeatLocationStep /> },
    { id: 6, component: <S.FinalConfirmStep /> },
  ]

  const pagination = {
    clickable: true,
    renderBullet: (idx: number) => {
      return `<span class='swiper-pagination-bullet'>${idx + 1}</span>`
    },
  }

  return (
    <div className={styles.slider}>
      <Swiper
        effect={'coverflow'}
        loop={false}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 30,
          depth: 100,
          modifier: 2,
        }}
        pagination={pagination}
        allowTouchMove={false}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
        onSwiper={swiper => {
          setSwiper(swiper)
          if (currentStep > 1) {
            swiper.slideTo(currentStep - 1, 0)
          }
        }}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>{slide.component}</SwiperSlide>
        ))}
        <SliderButtons />
      </Swiper>
    </div>
  )
}
