import React, { useState, useEffect } from 'react'
import { ClickableTag, ErrorMessage } from '@/components/ui'
import { useProfileStore } from '@/stores/profileStore'
import styles from './styles.module.scss'

export const TechStackStep: React.FC = React.memo(() => {
  const { updateTechStack, formErrors, formData } = useProfileStore()
  const [selected, setSelected] = useState<string[]>(formData.techStack)

  const taglist: string[] = [
    'Java',
    'Spring',
    'React',
    'Python',
    'Kubernetes',
    'AWS',
    'Pytorch',
    'FastAPI',
    'DevOps',
    'MLOps',
    '보안',
    'Langchain',
    '데이터베이스',
    '소프트웨어 아키텍처',
  ]

  const toggleTag = (tag: string): void => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(item => item !== tag))
    } else if (selected.length < 3) {
      setSelected([...selected, tag])
    }
  }

  const isMaxTagsSelected: boolean = selected.length >= 3

  useEffect(() => {
    updateTechStack(selected)
  }, [selected, updateTechStack])

  return (
    <div className={styles.container}>
      <div className={styles.instruction}>
        {formErrors.techStack ? (
          <ErrorMessage error={formErrors.techStack} />
        ) : (
          <span>최대 3개까지 선택 가능합니다.</span>
        )}
      </div>
      <div className={styles.tagList}>
        {taglist.map(tag => (
          <ClickableTag
            key={tag}
            label={tag}
            selected={selected.includes(tag)}
            onClick={() => toggleTag(tag)}
            disabled={isMaxTagsSelected && !selected.includes(tag)}
          />
        ))}
      </div>
    </div>
  )
})
