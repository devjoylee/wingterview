import { SubPageHeader } from '@/components/ui'
import styles from './styles.module.scss'
import { useParams } from 'react-router-dom'
import { useBoardDetail } from '@/hooks/board/useBoard'
import { dateFormatter } from '@/utils'

export const BoardDetailPage = () => {
  const { boardId } = useParams<{ boardId: string }>()
  const { data: post, isLoading } = useBoardDetail(boardId || '')

  if (isLoading) {
    return <div className={styles.loading}>로딩 중...</div>
  }

  if (!post) {
    return <div className={styles.error}>게시글을 찾을 수 없습니다.</div>
  }

  return (
    <div className={styles.boardDetailPage}>
      <SubPageHeader name="게시글 상세" backTo="/board" />

      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.authorInfo}>
            <img
              src={post.authorProfileImageUrl}
              alt={post.authorNickname}
              className={styles.avatar}
            />
            <div className={styles.authorMeta}>
              <h3 className={styles.authorName}>{post.authorNickname}</h3>
              <div className={styles.meta}>
                <span className={styles.date}>
                  {dateFormatter(post.createdAt)}
                </span>
                <span className={styles.views}>조회 {post.viewCnt}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>면접 질문</h2>
            <p className={styles.question}>{post.question}</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>모범 답변</h2>
            <p className={styles.modelAnswer}>{post.modelAnswer}</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>AI 피드백</h2>
            <p className={styles.feedback}>{post.feedback}</p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>면접자 코멘트</h2>
            <p className={styles.authorComment}>{post.authorComment}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
