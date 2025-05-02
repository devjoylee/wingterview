import { useState } from 'react'
import styles from './styles.module.scss'
import { ProfileCard } from '@components/profile'
import { ClickableTag } from '@/components/common'

export const TechStackStep: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([])

  const taglist: string[] = [
    'JavaScript',
    'TypeScript',
    'React',
    'Vue',
    'Angular',
    'Node.js',
    'Python',
    'Java',
    'Spring',
    'C#',
    'Go',
    'AWS',
    'Azure',
    'GCP',
    'Docker',
    'Kubernetes',
    'TensorFlow',
    'PyTorch',
    'NoSQL',
    'SQL',
    'Fastapi',
    'GraphQL',
    'Langchain',
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
    <ProfileCard name="기술 스택">
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
