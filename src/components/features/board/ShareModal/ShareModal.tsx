import { useState } from 'react'
import { Button, Modal, ErrorMessage } from '@/components/ui'
import styles from './styles.module.scss'
import { shareFeedback } from '@/api/boardAPI'
import { useNavigate } from 'react-router-dom'

interface Props {
  isOpen: boolean
  toggleModal: () => void
  question: string
  segmentId: string
}

export const ShareModal: React.FC<Props> = ({
  isOpen,
  toggleModal,
  question,
  segmentId,
}) => {
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    if (error) setError(null)
  }

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setError('내용을 입력해주세요.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await shareFeedback(segmentId, comment)

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      message={isSuccess ? ['공유가 완료되었습니다!'] : ['면접 후기 공유하기']}
      style={isSuccess ? 'congrats' : 'none'}
      closable={!isSubmitting}
      toggleModal={toggleModal}
    >
      <div className={styles.shareModalContent}>
        {!isSuccess && (
          <>
            <div className={styles.questionPreview}>
              <h4>질문</h4>
              <p>{question}</p>
            </div>

            <div className={styles.commentSection}>
              <h4>면접 후기</h4>
              <div className={styles.textareaWrapper}>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder="이 질문에 대한 면접 후기나 코멘트를 작성해주세요."
                  disabled={isSubmitting}
                  rows={5}
                  className={error ? styles.errorInput : ''}
                />
                {error && <ErrorMessage size="small" error={error} />}
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelButton}
                onClick={toggleModal}
                disabled={isSubmitting}
              >
                취소
              </button>
              <Button
                text="공유하기"
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            </div>
          </>
        )}
        {isSuccess && (
          <Button
            text="공유 게시판으로 이동"
            onClick={() => navigate('/board')}
          />
        )}
      </div>
    </Modal>
  )
}
