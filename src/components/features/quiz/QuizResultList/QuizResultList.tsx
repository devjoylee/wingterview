import { useRef, useEffect } from 'react'
import { QuizResultCard } from '@/components/features'
import styles from './styles.module.scss'
import { LoadingIndicator } from '@/components/ui'

interface Props {
  quizzes: QuizCardData[]
  hasNextPage?: boolean | undefined
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
  hasIndex?: boolean
  infiniteScroll?: boolean
}

export const QuizResultList: React.FC<Props> = ({
  quizzes,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  hasIndex,
  infiniteScroll,
}) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!infiniteScroll) return

    const target = observerTarget.current
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && fetchNextPage)
          fetchNextPage()
      },
      { threshold: 0.1 }
    )

    if (target) observer.observe(target)

    return () => {
      if (target) observer.unobserve(target)
    }
  }, [fetchNextPage, hasNextPage, infiniteScroll])

  return (
    <div className={styles.quizList}>
      {quizzes.map((quiz, index) => (
        <QuizResultCard key={index} data={quiz} hasIndex={hasIndex} />
      ))}

      {infiniteScroll && isFetchingNextPage && (
        <div className={styles.loading}>
          <LoadingIndicator size={40} />
        </div>
      )}

      {infiniteScroll && hasNextPage && (
        <div ref={observerTarget} className={styles.trigger}></div>
      )}
    </div>
  )
}
