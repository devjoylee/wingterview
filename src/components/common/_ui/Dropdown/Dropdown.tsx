import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import styles from './styles.module.scss'

interface DropdownProps {
  options: string[]
  placeholder?: string
  selectedOption: string
  onChange: (option: string) => void
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = '과정명을 선택해주세요',
  selectedOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelect = (option: string): void => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className={styles.dropdown}>
      <div
        className={`${styles.dropdownSelect} ${isOpen ? styles.active : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>
          {selectedOption || (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </p>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
