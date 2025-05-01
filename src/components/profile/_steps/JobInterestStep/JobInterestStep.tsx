import { useState } from 'react'
import styles from './styles.module.scss'
import { ProfileCard } from '@components/profile'
import { ClickableTag } from '@/components/common'

export const JobInterestStep: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([])

  const taglist: string[] = [
    '프론트엔드',
    '솔루션즈 아키텍트',
    '백엔드',
    '클라우드 엔지니어',
    '풀스택',
    'AI 개발자',
    'DevOps',
    '머신러닝 엔지니어',
    '데이터 사이언티스트',
  ]

  const toggleTag = (tag: string): void => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(item => item !== tag))
    } else if (selected.length < 3) {
      setSelected([...selected, tag])
    }
  }

  const isMaxTagsSelected: boolean = selected.length >= 3

  console.log(selected)

  return (
    <ProfileCard name="희망 직무">
      <div className={styles.container}>
        <span className={styles.instruction}>
          최대 3개까지 선택 가능합니다.
        </span>
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
    </ProfileCard>
  )
}
