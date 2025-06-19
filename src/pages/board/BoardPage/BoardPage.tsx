import { useState } from 'react'
import { EmptyPlaceholder, LoginButton, Logo } from '@/components/ui'
import { BoardPostList } from '@/components/features'
import { useBoardList } from '@/hooks/board/useBoard'
import { useAuthStore } from '@/stores'
import styles from './styles.module.scss'

export const BoardPage: React.FC = () => {
  const [orderBy, setOrderBy] = useState('latest')
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  const { posts, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBoardList(orderBy, 10, isLoggedIn)

  const handleOrderChange = (newOrder: string) => {
    setOrderBy(newOrder)
  }

  return (
    <div className={styles.boardPage}>
      <div className={styles.pageHeader}>
        <Logo white />
        <h1 className={styles.title}>면접 질문 공유 게시판</h1>
        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${orderBy === 'latest' ? styles.active : ''}`}
            onClick={() => handleOrderChange('latest')}
          >
            최신순
          </button>
          <button
            className={`${styles.filterButton} ${orderBy === 'popular' ? styles.active : ''}`}
            onClick={() => handleOrderChange('popular')}
          >
            조회순
          </button>
        </div>
      </div>

      <div className={styles.pageContent}>
        {isLoggedIn ? (
          posts.length > 0 ? (
            <BoardPostList
              posts={posts}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          ) : (
            !isLoading && (
              <EmptyPlaceholder
                type="sad"
                text={['면접 질문이 없습니다.', '첫 질문을 공유해보세요!']}
              />
            )
          )
        ) : (
          <div className={styles.notLoggedIn}>
            <div className={styles.message}>
              <p>게시판 기능을 이용하려면</p>
              <p>로그인이 필요합니다</p>
            </div>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  )
}
